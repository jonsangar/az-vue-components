<template lang="pug">
transition(
  :name="transition"
  v-on:after-enter="onAfterEnter"
  v-on:after-leave="onAfterLeave")

  .dialog(v-show="value && errorName !== 'backendDown'" @click="onClick" :class="classMode")
    .dialog__wrapper()
      .dialog__support(@click="goToSupport(support)" v-if="support")
        az-icon(name="info" scale="1")

      .dialog__body(
        tabindex="0")
        az-icon.dialog__icon(
          aria-hidden="true"
          v-if="type === 'success'"
          :name="icon" scale="5")

        az-icon.dialog__icon(
          v-else
          aria-hidden="true"
          :name="icon" scale="3")

        .dialog__title(
          tabindex="0"
          v-if="hasTitle"
          :class="{'dialog__title--onlyTitle': !message}") {{ title }}
        .dialog__message(
          tabindex="0"
          :aria-label="message"
          v-if="!list") {{ message }}
        .dialog__message(
          tabindex="0"
          v-else-if="list")
          ul(
            tabindex="0")
            li(
              tabindex="0"
              v-for="item in list") {{ item }}
        .dialog__errorCode(
          aria-hidden="true"
          v-if="errorCode && !isProd")
          | {{ errorCode }}
          span(v-if="errorName && !isProd") - {{ errorName }}
        .dialog__errorDescription(
          aria-hidden="true"
          v-if="errorDescription && !isProd") {{ errorDescription }}
        .dialog__errorInfo(
          aria-hidden="true"
          v-if="errorInfo && !isProd")
          strong {{ errorInfo.param }}:
          span.margin-left-quarter {{ errorInfo.value }}

      .dialog__footer
        .dialog__buttons
          .dialog__button(
            role="button"
            @click="cancel" v-if="confirm") {{ cancelText }}
          .dialog__button__reload(
            role="button"
            @click="accept" v-if="isError && name !== 'offline'") {{ reloadText }}
          .dialog__button(
            role="button"
            @click="accept" v-if="acceptBtn") {{ acceptText }}
          .dialog__button(
            role="button"
            @click="accept" v-else) {{ confirmText }}
</template>

<script>
import i18n from 'Core/services/language.service';
import Router from 'Core/router';

export default {
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    hasTitle: {
      type: Boolean,
      default: true,
    },
    message: {
      type: String,
      default: '',
    },
    list: {
      type: Array,
      default: null
    },
    errorCode: {
      type: String,
      required: false,
    },
    errorName: {
      type: String,
      required: false,
    },
    errorDescription: {
      type: String,
      required: false,
    },
    errorInfo: {
      type: Object,
      required: false,
    },
    transition: {
      type: String,
      default: 'fade',
    },
    type: {
      type: String,
      default: 'text',
    },
    closeOnClick: {
      type: Boolean,
      default: true,
    },
    support: {
      type: String,
      required: false,
    },
    redirect: {
      type: String,
      required: false,
    },
    value: {
      type: Boolean,
      default: false,
    },
    confirm: {
      type: Boolean,
      default: false,
    },
    acceptBtn: {
      type: Boolean,
      default: false,
    },
    callback: Function,
  },

  computed: {
    classMode() {
      if (this.type === 'success') return 'dialog--success';
      if (this.type === 'warning') return 'dialog--warning';
      if (this.type === 'error') return 'dialog--danger';
      return '';
    },

    isError() {
      return this.type === 'error';
    },

    isProd() {
      return this.$constants.IS_PRODUCTION;
    },

    cancelText() {
      return i18n.t('messages.errors.cancel');
    },

    reloadText() {
      return i18n.t('messages.errors.reload');
    },

    confirmText() {
      return i18n.t('messages.errors.confirm');
    },

    acceptText() {
      return i18n.t('buttons.accept');
    },
  },

  methods: {
    /**
     * Enlaza con el soporte y cierra el componente
     */
    goToSupport() {
      console.log('Ir a soporte:', this.support);
      this.close();
    },

    /**
     * Realiza una acción y cierra el componente
     */
    accept() {

      if (this.redirect && Router.history.current.name !== this.redirect) {
        Router.push({ name: this.redirect }).catch(() => {});
      }

      if (this.callback) {
        this.callback('confirm');
      }

      this.clear();
    },

    /**
     * Cierra el componente
     */
    cancel() {
      if (this.callback) {
        this.callback('cancel');
      }

      this.close();
    },

    /**
     * Cierra el componente
     */
    close() {
      this.$emit('close');
    },

    /**
     * Recarga la página
     */
    reload() {
      this.$router.push({ name: this.$constants.SETTINGS.DEFAULT_ROUTE }).catch(() => {});
    },

    onClick() {
      if (this.closeOnClick) {
        this.clear();
      }
    },

    onAfterEnter() {
      this.$emit('opened');

      if (this.onOpened) {
        this.onOpened();
      }
    },

    onAfterLeave() {
      this.$emit('closed');
    },
  },

  mounted() {
    document.body.classList.add('dialog-overflow');

    //
    // Añado el componente
    //
    document.body.appendChild(this.$el);

    //
    // Establezco el foco para lectores de texto
    //
    document.querySelector('.dialog__message').focus();
  },

  beforeDestroy() {
    document.body.classList.remove('dialog-overflow');

    //
    // Elimino el componente
    //
    const parent = this.$el.parentNode;
    if (parent) parent.removeChild(this.$el);
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);

  &--loading {
    .dialog__wrapper {
      background-image: none;
    }

    .dialog__title {
      animation: flickerAnimation 2s infinite;
    }
  }

  &--warning {
    .dialog__wrapper {
      background-image: radial-gradient(circle at 0% 0%, hsl(31, 100%, 60%), hsl(29, 100%, 35%));
    }
  }

  &--success {
    .dialog__wrapper {
      background-image: radial-gradient(circle at 0% 0%, #00AAA1, #137D79);
    }
  }

  &--danger {
    .dialog__wrapper {
      background-image: radial-gradient(circle at 0% 0%, hsl(9, 86%, 44%), hsl(5, 94%, 28%));
    }
  }

  &__wrapper {
    @include shadow(2);

    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    max-width: 350px;
    padding: triple() simple() simple();
    color: white;
    text-align: center;
    background-image: radial-gradient(circle at 0% 0%, color(brand), color(brand-darker));
    border-radius: $border-radius;
    transition: all 0.3s;
  }

  &__support,
  &__close {
    position: absolute;
    top: simple();
    right: half();
    width: double();
    height: double();
    cursor: pointer;
  }

  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    ul {
      margin-left: -10%;
      font-size: font-size(h5);
      list-style: none;
    }
  }

  &__icon {
    margin-bottom: double();
  }

  &__loading {
    margin-bottom: simple();
    font-size: 2rem !important;
  }

  &__title {
    margin-bottom: half();
    font-size: font-size(h4);
    font-weight: font-weight(bold);

    &--onlyTitle {
      font-size: font-size(h5);
    }
  }

  &__errorCode {
    margin-top: simple();
    font-weight: font-weight(bold);
  }

  &__errorInfo {
    margin-top: half();
    font-size: font-size(small1);
  }

  &__footer {
    width: 100%;
    margin-top: double();
  }

  &__buttons {
    display: flex;
    width: 90%;
    margin: 0 auto half();
  }

  &__button, &__button__reload {
    width: 100%;
    height: double();
    margin-right: simple();
    font-weight: font-weight(bold);
    line-height: double();
    cursor: pointer;
    border: solid 1px white;
    border-radius: $border-radius;

    &:last-of-type {
      margin-right: 0;
    }
  }

  &__button__reload {
    height: auto;
    width: 150%;
  }

  &__link {
    text-decoration: underline;
    cursor: pointer;
  }

  ::v-deep {
    .az-loading__item::before {
      background-color: color(gray6);
    }

    .az-loading__path {
      stroke: color(gray7);
    }
  }
}

@keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
