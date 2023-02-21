<template lang="pug">
transition(name="fade-in-linear-transition")
  .popupModal(
    @click="closeOnClick && close($event)")
    transition(
      name="zoom-in-center-transition" appear)
      .popupModal__wrapper
        .popupModal__backButton(
          v-if="backButton"
          @click="cancel")
          az-icon(icon="left" scale="1"
            @click="cancel")
        .popupModal__closeButton(
          v-if="closeButton"
          @click="close")
          az-icon(icon="close" scale="1"
            @click="close")
        .popupModal__title.font-weight-bold {{title}}
        .popupModal__container(
          :id="`popup-${_uid}`")
          .popupModal__body
            img.popupModal__img(
              v-if="src"
              :src="require(`@/assets/${src}`)")
            .popupModal__subtitle(v-if="subtitle"
              :class="{'popupModal__subtitle--danger': danger}")
              | {{subtitle}}
            .popupModal__message(v-if="message"
              :style="textAlign ? `text-align: ${textAlign}` : ''"
              :class="{'popupModal__message--otherMessage': otherMessage, 'popupModal__message--hasButtons': buttons && !otherMessage}"
              @click="onClickMessage"
              v-html="message")
            .popupModal__message(v-if="otherMessage"
              :style="textAlign ? `text-align: ${textAlign}` : ''"
              :class="{'popupModal__message--hasButtons': buttons}"
              @click="onClickOtherMessage"
              v-html="otherMessage")
            .popupModal__list(
              v-else-if="listInfo && listInfo.length > 0"
              :style="textAlign ? `text-align: ${textAlign}` : ''"
              :class="{'popupModal__message--hasButtons': buttons}")
              ul.popupModal__list__container
                li.popupModal__list__item(
                  v-if="item.title"
                  v-for="item in listInfo")
                  .popupModal__list__item__text
                    | {{ item.title }}
                  .popupModal__list__item__icon
                    az-icon(
                      v-if="item.info"
                      scale=".55"
                      name="icon-info"
                      @click="showItemInfo(item)")
            .popupModal__message(
              v-else
              :style="textAlign ? `text-align: ${textAlign}` : ''"
              :class="{'popupModal__message--hasButtons': buttons}")
              slot
            .popupModal__message--loading(
              v-if="loading")
              az-loading(type="circle")
              .toast__title.toast__title--onlyTitle {{ loadingText }}

        transition(
          name="fade")
          .linear-overlay-mask.fade(
            :class="{'linear-overlay-mask--buttons': buttons}"
            v-show="showMask")

        .popupModal__buttons.margin-top(v-if="buttons")
          .popupModal__button.popupModal__button--cancel(
            v-if="cancelBtn"
            @click="cancel") {{ getBtnText(cancelBtnText) }}
          .popupModal__button.popupModal__button--brand(
            v-if="acceptBtn"
            @click="accept") {{ getBtnText(acceptBtnText) }}
        .popupModal__footer(v-else-if="$slots.buttons")
          slot(name="buttons")


</template>

<script>
import OverlayMask from 'Core/mixins/OverlayMask.mixin';
import openLink from 'Core/utils/openLink.utils';

export default {
  mixins: [
    OverlayMask
  ],

  props: {
    src: {
      type: String,
      default: ''
    },

    loading: {
      type: Boolean,
      default: false
    },

    loadingText: {
      type: String,
      default() {
        return this.$i18n ? this.$i18n.t('messages.loading') : '';
      }
    },

    title: {
      type: String,
      required: false
    },


    subtitle: {
      type: String,
      required: false
    },

    danger: {
      type: Boolean,
      required: false,
    },

    message: {
      type: String,
      required: false
    },

    otherMessage: {
      type: String,
      required: false
    },

    buttons: {
      type: Boolean,
      default: false
    },

    backButton: {
      type: Boolean,
      default: false
    },

    acceptBtn: {
      type: Boolean,
      default: true
    },

    cancelBtn: {
      type: Boolean,
      default: true
    },

    closeButton: {
      type: Boolean,
      default: false
    },

    cancelBtnText: {
      type: String,
      default() {
        return this.$i18n ? this.$i18n.t('buttons.cancel') : '';
      }
    },

    acceptBtnText: {
      type: String,
      default() {
        return this.$i18n ? this.$i18n.t('buttons.accept') : '';
      }
    },

    textAlign: {
      type: String,
      default: 'center'
    },

    closeOnClick: {
      type: Boolean,
      default: true
    },

    /**
     * Si está a true evita entrar en el "catch" al cancelar pulsando sobre la máscara en una instancia del Popup
     */
    preventOnClickMaskReject: {
      type: Boolean,
      default: false,
    },

    listInfo: {
      type: Array,
      default: () => {
        return []
      }
    },

    callback: Function,

  },

  methods: {

    getBtnText(btnText){
      if(typeof btnText === 'function'){
        return btnText();
      }

      return btnText;
    },

    accept(){

      if(this.callback) {
        this.callback('confirm');
        this.clear();
      }


      this.$emit('accept');

    },

    close(e) {
      if(e.target !== e.currentTarget) return;

      if(this.callback) {
        if(!this.preventOnClickMaskReject) {
          this.callback('cancel');
        }
        this.clear();
      }

      this.$emit('close');
    },

    cancel(e) {
      if(e.target !== e.currentTarget) return;

      if(this.callback) {
        this.callback('cancel');
        this.clear();
      }

      this.$emit('cancel');
    },

    showItemInfo(item) {
      this.$emit('showInfo',item);
    },

    onClickMessage(e) {
      // console.log('onClickMessage: ', e)
      if (e?.target?.href){
        e.preventDefault()
        openLink(e.target.href)
      }
    },

    onClickOtherMessage(e) {
      // console.log('onClickOtherMessage: ', e)
      if (e?.target?.href){
        e.preventDefault()
        openLink(e.target.href)
      }
    },

    calculateOverlayMaskPosition() {
      this.$nextTick(() => {
        if(this.$slots.buttons){
          // Si usamos footer personalizado a través de slot, la altura puede variar. Se calcula para ubicarlo en la posición
          const mask = document.querySelector('.linear-overlay-mask');
          const footer = document.querySelector('.popupModal__footer');
          mask.style.bottom = `${footer.clientHeight}px`;
          mask.style.borderBottomLeftRadius = 0;
          mask.style.borderBottomRightRadius = 0;
        }
      })
    }
  },

  created() {
    this.initOverlaySettings(`popup-${this._uid}`);
    this.calculateOverlayMaskPosition();
  },

  mounted() {
    document.body.classList.add('popup-overflow');
    document.body.appendChild(this.$el);
  },

  beforeDestroy() {
    document.body.classList.remove('popup-overflow');

    const parent = this.$el.parentNode;
    if(parent) parent.removeChild(this.$el);
  }

}
</script>

<style lang="scss" src="./PopupModal.component.scss" scoped></style>
