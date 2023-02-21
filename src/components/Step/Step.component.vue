<template lang="pug">

.az-step(
  :class="{'az-step--active': isActive, 'az-step--error': hasError, 'az-step--success': isSuccess}")
  .az-step__icon
    az-icon(:name="setIcon" scale="1")
  .az-step__title(
    :class="'az-step__title--active'")
      <slot v-if="title === 'Step'">Step {{ order }}</slot>
      <slot v-else>{{ title }}</slot>
  //- .az-step__line
</template>

<script>
export default {

  props: {
    title: {
      type: String,
      default: 'Step'
    },

    order: {
      type: [Number,String],
      required: false
    },

    isActive: {
      type: Boolean,
      default: false
    },

    hasError: {
      type: Boolean,
      default: false
    },

    isSuccess: {
      type: Boolean,
      default: false,
    },

    icon: {
      type: String,
      default: 'save'
    }
  },

  computed: {
    iconDefault() {
      return (this.isActive && this.icon === 'save') ? 'save' : 'cancel'
    },

    setIcon() {
      const icon = this.iconDefault;
      if(this.icon === 'save') {
        return icon
      }

      return this.icon;
    }
  }

}
</script>

<style lang="scss" src="./Step.component.scss" scoped></style>
