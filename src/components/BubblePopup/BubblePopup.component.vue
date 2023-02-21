<template lang="pug">
.bubblePopup(
  :class="{'bubblePopup__mask': mask}"
  @click.self="close"
  @touchstart.self="close")
  .bubblePopup__content(
    :style="styleObject"
    ref="content")
    slot

</template>

<script>
export default {
  props: {
    posX: {
      type: Number,
      default: undefined
    },

    offsetPosX: {
      type: Number,
      default: 0
    },

    posY: {
      type: Number,
      default: undefined
    },

    offsetPosY: {
      type: Number,
      default: 0
    },

    width: {
      type: Number,
      default: 200
    },

    direction: {
      type: String,
      default: 'right',
      validator: value => ['right', 'left'].indexOf(value) !== -1
    },

    mask: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      localWidth: this.width
    }
  },

  computed: {

    calculatePosX() {
      if(this.direction === 'right') {
        return this.posX + this.offsetPosX;
      }

      return (this.posX + this.offsetPosX) - this.width;
    },

    styleObject() {
      return {
        width: `${this.localWidth}px`,
        top: this.posY !== undefined ? `${this.posY + this.offsetPosY}px` : '',
        left: this.posX !== undefined ? `${this.calculatePosX}px` : '',

      }
    }
  },

  methods: {
    close(e) {
      e.stopPropagation();

      this.$emit('close', e);
    }
  },

}
</script>

<style lang="scss" src="./BubblePopup.component.scss" scoped></style>
