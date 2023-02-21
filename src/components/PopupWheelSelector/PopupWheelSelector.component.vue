<template lang="pug">
PopupFooter(
  transition="fromBottom"
  :title="title"
  @accept="apply"
  @close="close"
  buttons)
  .popupWheelSelector
    scroll-picker.margin-bottom(
      v-model="localValue"
      :options="options"
    )

</template>

<script>
import PopupFooter from '../PopupFooter';

/**
 * NOTA: Este componente tiene que renderizarse con una transición que no implique un cambio de escala (como zoom)
 * En caso de usar una transición "on Appear" con cambio de escala, el componente vue-scroll-picker se rompe al inicializarse
 */
export default {

components: { PopupFooter },

props: {
  title: {
    type: String,
    default: ''
  },

  value: {
    type: [String, Number, Boolean],
  },

  options: {
    type: [Object, Array],
    default()  {
      return [];
    }
  }
},

data() {
  return {
    localValue: this.value
  }
},

watch: {
  value(newValue) {
    this.localValue = newValue
  },
},

methods: {
  apply() {
    this.$emit('input', this.localValue);
    this.$emit('change', this.localValue);
    this.$emit('close');
  },
  /**
   * Cierra el modal
   */
  close(e) {
    //
    // Prevenimos que el click se emita sólo en caso de hacerlo sobre .popupFooter
    //
    if(e.target !== e.currentTarget) return;
    this.$emit('close');
  },
},

created() {
  this.localValue = this.value;
},

}
</script>

<style lang="scss" src="./PopupWheelSelector.component.scss" scoped></style>
