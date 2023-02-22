<template lang="pug">
.popupFooter(
    @click="close")
  transition(
      :name="transition" :appear="transitionOnAppear")
    .popupFooter__wrapper
      .popupFooter__topLeft(
        v-if="$slots.topLeft"
        @click="onClickTopLeft")
        slot(name="topLeft")
      .popupFooter__topLeft(
        v-else-if="buttons"
        @click="close")
        | {{ $t('units.cancel') }}
      .popupFooter__title(v-if="title") {{ title }}
      .popupFooter__bar(
        v-else-if="topbar"
        @click="close")
      .popupFooter__topRight(
        v-if="$slots.topRight"
        @click="onClickTopRight")
        slot(name="topRight")
      .popupFooter__topRight(
        v-else-if="buttons"
        :class="{'popupFooter__topRight--disabled': this.disabled}"
        @click.self="apply")
        | {{ $t('units.done') }}

      .popupFooter__container(
          :id="`popup-${_uid}`"
          :class="{'margin-top-half': topbar || title}"
        )
        .popupFooter__body
          slot
      transition(
        name="fade")
        .linear-overlay-mask.fade(
          :class="{'linear-overlay-mask--buttons': buttons}"
          v-show="showMask")

      .popupFooter__buttons(v-if="footerButtons")
        .popupFooter__button.popupFooter__button--cancel(
          @click="close") {{ $t('units.cancel') }}
        .popupFooter__button.popupFooter__button--brand(
          @click="apply"
          :class="{'popupFooter__button--disabled': this.disabled}")
          | {{ $t('units.done') }}

</template>

<script>
import OverlayMask from '../../mixins/OverlayMask.mixin';

export default {
  mixins: [
    OverlayMask
  ],

  props: {
    title: {
      type: String,
      deafult: ''
    },

    disabled: {
      type: Boolean,
      default: false
    },

    buttons: {
      type: Boolean,
      default: false
    },

    footerButtons: {
      type: Boolean,
      default: false
    },

    topbar: {
      type: Boolean,
      default: true
    },

    transition: {
      type: String,
      default: 'zoom-in-bottom-transition'
    },

    transitionOnAppear: {
      type: Boolean,
      default: true
    }

  },

  methods: {
    apply(e) {
      if (this.disabled === true) return;

      this.$emit('accept', e);
      this.$emit('close', e);
    },

    onClickTopRight(e) {
      this.$emit('clickTopRight', e);
    },

    onClickTopLeft(e) {
      this.$emit('clickTopLeft', e);
    },

    close(e) {
      //
      // Prevenimos que el click se emita sólo en caso de hacerlo sobre .popupFooter
      //
      if(e.target !== e.currentTarget) return;

      this.$emit('close', e);
    }
  },

  created() {
    this.initOverlaySettings(`popup-${this._uid}`);
  },


}
</script>

<style lang="scss" src="./PopupFooter.component.scss" scoped></style>
