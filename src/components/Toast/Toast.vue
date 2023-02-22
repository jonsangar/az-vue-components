<template lang="pug">
transition(
  :name="transition"
  v-on:after-enter="onAfterEnter"
  v-on:after-leave="onAfterLeave")

  .toast(v-show="value" @click="onClick" :class="classMode")
    .toast__wrapper()
      .toast__body
        az-loading.toast__loading(type="circle" v-if="isLoading")
        az-icon.toast__icon(
          v-else-if="type === 'success'"
          :name="icon" scale="5")

        az-icon.toast__icon(
          v-else
          :name="icon" scale="3")

        //- .toast__icon(v-else-if="type !== 'warning' && type !== 'info'")
        //-   az-icon(:name="icon" scale="1.5")
        //- .toast__icon--warning(v-else)
        //-   az-icon(:name="icon" scale="3")

        .toast__title(
          :class="{'toast__title--onlyTitle': !message}") {{ title }}
        .toast__message(v-if="message") {{ message }}
        .toast__errorCode(v-if="errorCode && !isProd")
          | {{ errorCode }}
          span(v-if="errorName && !isProd") - {{ errorName }}
        .toast__errorDescription(v-if="errorDescription && !isProd") {{ errorDescription }}
        .toast__errorInfo(v-if="errorInfo && !isProd")
          strong {{ errorInfo.param }}:
          span.margin-left-quarter {{ errorInfo.value }}
</template>

<script>
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
    message: {
      type: String,
      default: '',
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
    value: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classMode() {
      if (this.type === 'loading') return 'toast--loading';
      if (this.type === 'success') return 'toast--success';
      if (this.type === 'warning') return 'toast--warning';
      if (this.type === 'error') return 'toast--danger';
      return '';
    },

    isLoading() {
      return this.type === 'loading';
    },

    isError() {
      return this.type === 'error';
    },

  },

  methods: {
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
    document.body.classList.add('toast-overflow');

    //
    // Añado el componente
    //
    document.body.appendChild(this.$el);
  },

  beforeDestroy() {
    document.body.classList.remove('toast-overflow');

    //
    // Elimino el componente
    //
    const parent = this.$el.parentNode;
    if (parent) parent.removeChild(this.$el);
  },
};
</script>

<style lang="scss" scoped>
.toast {
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
    .toast__wrapper {
      background-image: none;
    }

    .toast__title {
      animation: flickerAnimation 2s infinite;
    }
  }

  &--warning {
    .toast__wrapper {
      background-image: radial-gradient(circle at 0% 0%, hsl(31, 100%, 60%), hsl(29, 100%, 35%));
    }
  }

  &--success {
    .toast__wrapper {
      background-image: radial-gradient(circle at 0% 0%, #00AAA1, #137D79);
    }
  }

  &--danger {
    .toast__wrapper {
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
  }

  &__icon {
    margin-bottom: double();
  }

  // &__icon {
  //   width: 4rem;
  //   height: 4rem;
  //   padding: half();
  //   margin-bottom: double();
  //   line-height: 2rem;
  //   text-align: center;
  //   border: 2px solid white;
  //   border-radius: 50%;
  // }

  // &__icon--warning {
  //   margin-bottom: double();
  // }

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

  &__button {
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
