<template lang="pug">
.dotButton(
  :class="{'dotButton--active': active, 'dotButton--disabled': disabled}"
  @click="onClick"
  @touchstart="!disabled ? emitFeedback() : false"
)
  .dotButton__container
    .dotButton__value {{ value }}
    .dotButton__link(v-if="isLinked")
      az-icon(
        name="link"
        scale=".2"
      )
</template>

<script>
import TapticMixin from 'Core/mixins/taptic.mixin';

export default {

  mixins: [TapticMixin],

  props: {
    value: {
      type: [String, Number],
      default: '',
      // validator: value => value.length <= 3
    },
    disabled: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    isLinked: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onClick(e) {
      if(!this.disabled) {
        this.$emit('click', e);
      }
    }
  }

}
</script>

<style lang="scss" src="./DotButton.component.scss" scoped></style>
