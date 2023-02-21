<template lang="pug">
.inputDoubleRange
  .showValue(
    v-if="showValues")
    .showValue__upper(
      aria-hidden="true"
      ref="valueUpper"
      :style="showUpperValuePos")
      | {{ upperValue }}

    .showValue__lower(
      aria-hidden="true"
      ref="valueLower"
      :style="showLowerValuePos")
      | {{ lowerValue }}

  .inputDoubleRange__bg(
    :style="drawBgColor")
    .inputDoubleRange__bg--up(
      :style="backgroundDrawUp")
    .inputDoubleRange__bg--low(
      :style="backgroundDrawLow")
  input.inputRange.inputRange__upper(
    :aria-hidden="true"
    ref="inputRangeUpper"
    type="range"
    role="slider"
    v-bind="$attrs"
    v-model="upperValue"
    :disabled="disabled"
    @input="updateRange"
    @change="onChange")
  input.inputRange.inputRange__lower(
    :aria-hidden="true"
    ref="inputRangeLower"
    type="range"
    role="slider"
    v-bind="$attrs"
    v-model="lowerValue"
    :disabled="disabled"
    @input="updateRange"
    @change="onChange")

  .accesibility
    .accesibility__item
      input(
        id="lowerAriaSelector"
        tabindex="0"
        :aria-label="ariaLabelLower"
        ref="inputRangeLower"
        type="range"
        role="slider"
        v-bind="$attrs"
        v-model="lowerValue"
        :disabled="disabled"
        @input="updateRange"
        @change="onChange")
      input(
        id="upperAriaSelector"
        :aria-label="ariaLabelUpper"
        tabindex="0"
        ref="inputRangeUpper"
        type="range"
        role="slider"
        v-bind="$attrs"
        v-model="upperValue"
        :disabled="disabled"
        @input="updateRange"
        @change="onChange")

</template>

<script>
export default {

props: {
  offset: {
    type: Number,
    default: 0
  },

  lowerMinValue: {
    type: Number,
    required: false
  },

  lowerMaxValue: {
    type: Number,
    required: false
  },

  upperMaxValue: {
    type: Number,
    required: false
  },

  upperMinValue: {
    type: Number,
    required: false
  },

  bgColor: {
    type: String,
    default: '#ebf0f4'
  },

  upperColor: {
    type: String,
    default: 'transparent'
  },

  lowerColor: {
    type: String,
    default: 'transparent'
  },

  disabled: {
    type: Boolean,
    default: false
  },

  showValues: {
    type: Boolean,
    default: false
  },

  value: {
    type: Object,
    required: true
  },

  ariaLabelUpper: {
    type: String,
    default: ''
  },

  ariaLabelLower: {
    type: String,
    default: ''
  }
},

data() {
  return {
    upperValue: 80,
    lowerValue: 20,
    inputLowerWidth: 0,
    inputUpperWidth: 0,
    lowerMinValueLocal: null,
    lowerMaxValueLocal: null,
    upperMaxValueLocal: null,
    upperMinValueLocal: null,
  }
},

watch: {
  value() {
    this.upperValue = parseInt(this.value.upper, 10);
    this.lowerValue = parseInt(this.value.lower, 10);
  },

  upperValue(){
    const output = {
      lower: parseInt(this.lowerValue,10),
      upper: parseInt(this.upperValue,10)
    }

    this.$emit('input',output);
  },

  lowerValue(){
    const output = {
      lower: parseInt(this.lowerValue, 10),
      upper: parseInt(this.upperValue,10)
    }

    this.$emit('input',output);
  },
},

computed: {
  showUpperValuePos() {
    if(this.showValues === false) return null;

    let pos = 0;

    const max = this.$attrs.max !== undefined ? this.$attrs.max : 100;
    const min = this.$attrs.min !== undefined ? this.$attrs.min : 0;

    pos = Number(((this.upperValue - min) * 100) / (max - min))

    return {
      left: `${pos}%`, // Restamos 15, 1,5 veces el ancho del tirador, para centrar el valor
      transform: pos === 100 ? 'translateX(-100%)' : pos !== 0 ? 'translateX(-50%)' : ''
    }
  },

  showLowerValuePos() {
    if(this.showValues === false) return null;

    let pos = 0;

    const max = this.$attrs.max !== undefined ? this.$attrs.max : 100;
    const min = this.$attrs.min !== undefined ? this.$attrs.min : 0;

    pos = Number(((this.lowerValue - min) * 100) / (max - min))

    return {
      left: `${pos}%`, // Restamos 15, 1,5 veces el ancho del tirador, para centrar el valor
      transform: pos === 100 ? 'translateX(-100%)' : pos !== 0 ? 'translateX(-50%)' : ''
    }
  },
  drawBgColor() {
    return {
      backgroundColor: this.bgColor,
      opacity: this.disabled ? .5 : 1
    }
  },
  backgroundDrawLow() {
    let width = 0
    const max = this.$attrs.max !== undefined ? this.$attrs.max : 100;
    const min = this.$attrs.min !== undefined ? this.$attrs.min : 0;


    if(this.inputLowerWidth !== undefined) {
      // width = (this.lowerValue * this.inputLowerWidth) / (max - min)
      width = Number(((this.lowerValue - min) * 100) / (max - min))
    }

    return {
      width: `${width}%`,
      backgroundColor: this.lowerColor,
      opacity: this.disabled ? .5 : 1
    };
  },

  backgroundDrawUp() {
    let width = 0
    const max = this.$attrs.max !== undefined ? this.$attrs.max : 100;
    const min = this.$attrs.min !== undefined ? this.$attrs.min : 0;



    if(this.inputUpperWidth !== undefined) {
      width = Number(((this.upperValue - min) * 100) / (max - min))
    }

    return {
      width: `${width}%`,
      backgroundColor: this.upperColor,
      opacity: this.disabled ? .5 : 1
    };
  }
},

methods: {

  updateRange(){
    const lower = parseInt(this.lowerValue, 10);
    const upper = parseInt(this.upperValue, 10);
    const step = this.$attrs.step !== undefined ? this.$attrs.step : 1;
    const max = this.$attrs.max !== undefined ? this.$attrs.max : 100;
    const min = this.$attrs.min !== undefined ? this.$attrs.min : 0;
    if(lower >= upper - this.offset && lower >= min + step){
      this.lowerValue = upper - this.offset;

    }

    if(lower <= this.lowerMinValueLocal && lower > min) {
      this.lowerValue = this.lowerMinValueLocal;
    }

    if(lower >= this.lowerMaxValueLocal && lower < max) {
      this.lowerValue = this.lowerMaxValueLocal;
    }


    if(upper <= lower + this.offset && upper <= max - step) {
      this.upperValue = lower + this.offset;

    }

    if(upper <= this.upperMinValueLocal && upper > min) {
      this.upperValue = this.upperMinValueLocal;
    }

    if(upper >= this.upperMaxValueLocal && upper < max) {
      this.upperValue = this.upperMaxValueLocal;
    }

  },

  onChange(e) {
    if(e.target.id === 'upperAriaSelector') {
      this.upperValue = e.target.value;
      this.updateRange();
    } else if (e.target.id === 'lowerAriaSelector'){
      this.lowerValue = e.target.value;
      this.updateRange();
    }

    const output = {
      lower: parseInt(this.lowerValue,10),
      upper: parseInt(this.upperValue,10)
    }

    this.$emit('change', output);
  },

  handleResize() {
    this.inputLowerWidth = this.$refs.inputRangeLower.clientWidth;
    this.inputUpperWidth = this.$refs.inputRangeUpper.clientWidth;
  },

  init() {
    this.upperValue = this.value ? parseInt(this.value.upper, 10) : 80;
    this.lowerValue = this.value ? parseInt(this.value.lower, 10) : 20;
    this.lowerMinValueLocal = this.lowerMinValue !== undefined ? this.lowerMinValue : this.$attrs.min !== undefined ? this.$attrs.min : 0
    this.lowerMaxValueLocal = this.lowerMaxValue !== undefined ? this.lowerMaxValue : this.$attrs.max !== undefined ? this.$attrs.max : 100
    this.upperMinValueLocal = this.upperMinValue !== undefined ? this.upperMinValue : this.$attrs.min !== undefined ? this.$attrs.min : 0
    this.upperMaxValueLocal = this.upperMaxValue !== undefined ? this.upperMaxValue : this.$attrs.max !== undefined ? this.$attrs.max : 100
  }
},

created() {
  window.addEventListener('resize', this.handleResize);
},

mounted() {
  this.handleResize();
  this.init();

},

destroyed() {
  window.removeEventListener('resize', this.handleResize);
},

}
</script>

<style lang="scss" src="./InputDoubleRange.component.scss" scoped></style>
