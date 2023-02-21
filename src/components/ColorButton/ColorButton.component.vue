<template lang="pug">
.colorButton(
  @click="$emit('click')")
  .colorButton__fill(
    :class="getStyle")
</template>

<script>
export default {
  props: {
    color: {
      type: Number,
      default: 1
    },

    selected: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    getStyle() {
      return [
        `colorButton__fill__color-${this.color}`,
        this.selected ? `colorButton__fill__color-${this.color}--selected` : ''
      ]
    }
  }

}
</script>

<style lang="scss" src="./ColorButton.component.scss" scoped></style>
