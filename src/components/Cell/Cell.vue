<template lang="pug">
  .az-cell(:class="classObject" @click="onClick")
    //- Left Icon Block
    .az-cell__left-icon(
      v-if="leftIcon || $slots.leftIcon"
      @click="clickLeftIcon")
      slot(name="leftIcon")
        az-icon(
          v-if="scaleLeftIcon"
          :name="leftIcon"
          :scale="scaleLeftIcon"
          :color="leftIconColor")
        az-icon(:name="leftIcon" :color="leftIconColor" v-else)

    //- Title Block
    .az-cell__title(
      :style="{width: titleWidth, 'text-align': titleAlign}"
      v-if="title || $slots.title || label || $slots.label"
      @click="clickTitle")
      slot(name="title")
        | {{ title }}
        az-icon.margin-left-half(
            v-if="infoMessage && infoTextValidator(infoMessage)"
            name="icon-info"
            color="var(--color-gray6)"
            scale=".8"
          )
      .az-cell__label(v-if="label || $slots.label")
        slot(name="label")
          | {{ label }}

    //- Input block
    .az-cell__value
      .az-cell__body(:style="{'justify-content': valueAlignFlex}")
        slot
          | {{ value }}

        //- Link Icon Block
        .az-cell__link-icon(
          :class="{'az-cell__link-icon--active': linkActive}"
          v-if="isLink && !$slots.rightIcon")
          az-icon(:name="arrowDirection" :scale="arrowScale")

        //- Right Icon Block
        .az-cell__right-icon(
          v-if="(!isLink && rightIcon) || $slots.rightIcon"
          @click="clickRightIcon")
          slot(name="rightIcon")
            az-icon(:name="rightIcon" :color="rightIconColor")

    .az-cell__errorMessage(
      v-if="errorMessage")
      | {{ errorMessage }}

    PopupModal(
      v-if="showInfoPopup"
      :title="infoTitle"
      :message="infoMessage"
      :closeButton="true"
      text-align="left"
      @close="showInfoPopup = false")

</template>

<script>
import openLink from 'Core/utils/openLink.utils';
import PopupModal from 'Core/components/PopupModal';

export default {
  components: {
    PopupModal
  },

  props: {
    title: {
      type: String,
      required: false,
    },
    titleWidth: {
      type: [String, Number],
      default: '90px',
    },
    titleAlign: {
      type: String,
      default: 'left',
      validator: value => ['left', 'center', 'right'].indexOf(value) !== -1,
    },
    label: {
      type: String,
      required: false,
    },
    value: {
      type: [String, Number],
      required: false,
    },
    valueAlign: {
      type: String,
      default: 'right',
      validator: value => ['left', 'center', 'right'].indexOf(value) !== -1,
    },
    leftIcon: {
      type: String,
      required: false,
    },
    leftIconColor: {
      type: String,
      default: ''
    },
    scaleLeftIcon: {
      type: String,
      required: false,
    },

    rightIcon: {
      type: String,
      required: false,
    },
    rightIconColor: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      required: false,
    },
    to: {
      type: [String, Object],
      required: false,
    },
    isLink: {
      type: Boolean,
      default: false,
    },
    linkActive: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: '',
      validator: value => ['header', 'subcell', ''].indexOf(value) !== -1
    },
    arrowDirection: {
      type: String,
      default: 'right',
      validator: value => ['left', 'right', 'up', 'down'].indexOf(value) !== -1,
    },

    errorMessage: {
      type: String,
      default: ''
    },

    infoMessage: {
      type: String,
      default: ''
    },

    infoTitle: {
      type: String,
      default: ''
    }
  },
  computed: {
    /**
     * Devuelve un listado con las clases que dependen de la configuración
     */
    classObject() {
      return [this.isLink ? 'az-cell--link' : '', this.type === 'header' ? 'az-cell--header' : '', this.type === 'subcell' ? 'az-cell--subcell' : '', this.errorMessage ? 'az-cell--showError' : ''];
    },

    valueAlignFlex() {
      if (!this.title && !this.$slots.title && !this.label && !this.$slots.label) {
        return 'flex-start';
      }

      switch (this.valueAlign) {
        case 'right':
          return 'flex-end';
        case 'center':
          return 'center';
        default:
          return 'flex-start';
      }
    },

    arrowScale() {
      return this.arrowDirection === 'up' || this.arrowDirection === 'down' ? '1' : '1.2';
    },

  },

  data() {
    return {
      showInfoPopup: false
    }
  },

  methods: {
    /**
     * Evento cuando se hace click en la celda
     */
    onClick(event) {
      if (this.url) {
        openLink(this.url);
        return;
      }

      if (this.to) {
        this.$router.push(this.to).catch(() => {});
        return;
      }

      this.$emit('click', event);
    },

    clickLeftIcon(event) {
      this.$emit('clickLeftIcon', event);
    },
    clickRightIcon(event) {
      this.$emit('clickRightIcon', event);
    },
    clickTitle(event) {
      if(this.infoMessage && this.infoTextValidator(this.infoMessage)) {
        this.showInfoPopup = true
      }
      this.$emit('clickTitle', event);
    },
    /**
     * Sólo valida textos que son incluídos en el archivo de traducción info.json siguiendo el formato: info.[key].desc
     * Si no existe la key en el archivo, no se va a mostrar el icono y el cuadro de info
     *
     * NOTA: Si el texto introducido en info proviene de otro archivo o formato no servirá esta validación
     */
    infoTextValidator(text) {
      if(text.startsWith('info.') && text.endsWith('.desc')) return false

      return true
    }
  },
};
</script>

<style src="./Cell.scss" lang="scss"></style>
