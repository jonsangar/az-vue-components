<template lang="pug">
.Select(
  :style="width ? `width: ${width}` : ''")
  .Select__input(
    :class="{'Select__input--disabled': disabled}"
  )
    .Select__input__value(
      :class="{'Select__input__value--alignRight': alignRight}"
    )
      |  {{ outputValue }}
    .Select__input__icon(v-if="!disabled")
      az-icon(
        name="down"
        scale=".6")

    //- :class="{'Select--disabled': disabled}"
  select(
    :disabled="disabled"
    v-bind="$attrs"
    ref="selector"
    v-if="$slots.default"
    v-model="localValue")
    slot
    //- @change="onChange")

  //- select(
  //-   v-else-if="options && Array.isArray(options)"
  //-   v-model="localValue"
  //-   @change="onChange")
  //-   option(
  //-     v-for="opt in options"
  //-     :value="opt") {{ opt }}

  //- select(
  //-   v-else-if="options && typeof options === 'object'"
  //-   v-model="localValue"
  //-   @change="onChange")
  //-   option(
  //-     v-for="(opt, key) in options"
  //-     :key="key"
  //-     :value="key") {{ opt }}



</template>

<script>
export default {

props: {
  value: {
    type: [String, Number, Boolean]
  },

  options: {
    type: [Object, Array],
    default() {
      return []
    }
  },

  disabled: {
    type: Boolean,
    default: false
  },

  width: {
    type: String,
    default: ''
  },

  alignRight: {
    type: Boolean,
    default: false
  }
},

watch: {
  value(newValue) {
    this.localValue = newValue;

    this.$nextTick(() => {
      this.updateOutputValue();
    })
  },

  localValue(newValue) {
    this.$emit('input', newValue);
    this.$emit('change', newValue);
    // Actualizo valor seleccionado en el slot tanto con evento change e input,
    // como también cuando se cambia por websockets o en asignación desde algún método
    this.$nextTick(() => {
      const index = this.$refs.selector?.selectedIndex;
      this.outputValue = index !== -1 ? this.$refs.selector[index]?.text : '--'
    })

  }
},

// computed: {
//   outputValue() {
//     console.log(this.options, this.localValue);
//     console.log("SLOTS", this.$slots.default);
//     return Array.isArray(this.options) ? this.localValue : this.options[this.localValue]
//   }
// },

data() {
  return {
    localValue: this.value,
    outputValue: this.value
  }
},

methods: {
  // onChange(e) {

  //   if(this.$slots.default !== undefined) {
  //     const select = e?.target;
  //     const options = e?.target ? e?.target?.options : [];
  //     const index = select?.selectedIndex;

  //     // this.$set('outputValue', index !== -1 ? options[index]?.text : '--')
  //     this.outputValue = index !== -1 ? options[index]?.text : '--'
  //     console.log('Output onchange: ', this.outputValue)
  //   }
    // } else if(Array.isArray(this.options)) {
    //   this.outputValue = this.localValue
    // } else {
    //   this.outputValue = this.options[this.localValue]
    // }

  // },

  updateOutputValue() {
    const selector = this.$refs.selector;
    this.outputValue = selector && selector.selectedIndex !== -1 ? selector.options[selector.selectedIndex].text : '--';
    // console.log(selector.selectedIndex, selector.options, this.outputValue);
  }
},

mounted() {
  this.updateOutputValue();
}

}
</script>

<style lang="scss" src="./Select.component.scss" scoped></style>
