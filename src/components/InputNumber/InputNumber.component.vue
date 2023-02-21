<template lang="pug">
.input-number
  .input-number__title(
    v-if="title")
    | {{ title }}
  .input-number__button
    az-icon(
      name="less"
      scale="0.8"
      @click="decrement")
  .input-number__value
    | {{ localValue }} {{ sufix ? sufix : '' }}
  .input-number__button
    az-icon(
      name="more"
      scale="0.8"
      @click="increment")
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false
    },

    value: {
      type: Number,
      required: true
    },

    min: {
      type: Number,
      required:false
    },

    max: {
      type: Number,
      required: false
    },

    step: {
      type: Number,
      default: 1
    },

    valueList: {
      type: Array,
      required: false
    },

    sufix: {
      type: String,
      required: false
    }
  },

  data() {

    return {
      localValue: this.value
    }

  },

  watch: {
    localValue(newValue) {
      this.$emit('input', newValue);
    },

    value(newValue) {
      this.localValue = newValue;
    }
  },

  methods: {
    increment() {
      if( this.valueList && this.valueList.length > 0){
        const index = this.valueList.indexOf(this.localValue);
        const hasNext = (index + 1) < this.valueList.length ;
        if (!hasNext) return;
        this.localValue = this.valueList[index + 1];
      }

      this.$emit('click', this.localValue);
    },

    decrement() {

      if( this.valueList && this.valueList.length > 0){
        const index = this.valueList.indexOf(this.localValue);
        const hasPrev = (index - 1) >= 0;
        if (!hasPrev) return;
        this.localValue = this.valueList[index - 1];
      }

      this.$emit('click', this.localValue);

    }
  }
}
</script>

<style lang="scss" src="./InputNumber.component.scss" scoped></style>
