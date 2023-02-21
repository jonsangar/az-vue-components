<template lang="pug">
.colorButtonsSelector(
  :class="{'colorButtonsSelector--disbled': disabled}")
  ColorButton.colorButtonsSelector__item(
    v-for="color in colors"
    :key="color"
    :color="color"
    :selected="localValue === color"
    @click="setColor(color)")

</template>

<script>
import ColorButton from 'Core/components/ColorButton';

export default {
components: {ColorButton},

props: {
  value: {
    type: Number,
    required: true
  },

  colors: {
    type: Array,
    default() {
      return [1,2,3,4,5,6]
    }
  },

  disabled: {
    type: Boolean,
    default: false
  }
},
data(){
  return {
    localValue: this.value
  }
},

watch: {
  value(newValue) {
    this.localValue = newValue
  },

  localValue(newValue) {
    this.$emit('input', newValue);
    this.$emit('change', newValue);
  }
},

methods: {
  setColor(color) {
    if(this.disabled) return;

    this.emitFeedback();
    this.localValue = color;
  },

}

}
</script>

<style lang="scss" src="./ColorButtonsSelector.component.scss" scoped></style>
