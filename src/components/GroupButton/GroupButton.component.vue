<template lang="pug">
.groupButtonComponent(v-if="available")
  az-section-info(
    v-if="label || info"
    :title="label"
    :info="info"
    mode="brand")
  .groupButtons.background-gray7(
      v-if="values")
      .groupButtons__item.background-gray8(
        v-for="(mode, index) in values"
        :key="index"
        :class="{'select': mode === localValue}"
        @click="changeModeActive(mode)")
        .GroupButton__item__icon(v-if="hasIcons")
          az-icon(
            v-if="!iconValues"
            :name="`${iconPrefix}${values[index]}`"
            scale="0.8")
          az-icon(
            v-else-if="typeof iconValues === 'object'"
            :name="iconValues[mode]"
            scale="0.8")
          az-icon(
            v-else
            :name="iconValues[index]"
            scale="0.8")
        .GroupButton__item__text(v-else)
          | {{ valuesNames ? valuesNames[mode] : mode }}
</template>

<script>
export default {

props: {
  value: {
    type: [String, Number],
    default: null,
  },

  available: {
    type: Boolean,
    default: true
  },

  label: {
    type: String,
    default: ''
  },

  info: {
    type: String,
    default: ''
  },

  values: {
    type: Array,
    default() {
      return [];
    }
  },

  valuesNames: {
    type: Array,
    default() {
      return null;
    }
  },

  iconPrefix: {
    type: String,
    default: ''
  },

  iconValues: {
    type: [Array, Object],
    default() {
      return null
    }
  },

  emptySelection: {
    type: Boolean,
    default: true
  },

  hasIcons: {
    type:Boolean,
    default: false
  }
},

watch: {
  value(newValue) {
    this.localValue = newValue
  },

  localValue(newValue) {
    this.$emit('change', newValue)
    this.$emit('click', newValue)
    this.$emit('input', newValue)
  }
},

data() {
  return {
    localValue: this.value
  }
},

methods: {
  changeModeActive(mode) {
    if(mode === this.localValue) {
      if(!this.emptySelection) return;
      this.localValue = null
    } else {
      this.localValue = mode
    }
  },
},

mounted() {
  if(!this.emptySelection && this.values && this.values.length > 0) {
    this.value = this.values[0]
  }
}

}
</script>

<style lang="scss" src="./GroupButton.component.vue" scoped></style>
