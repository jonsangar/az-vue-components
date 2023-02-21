<template lang="pug">
.az-folding-box
  .az-folding-box__header
    .az-folding-box__header__title
      | {{ title }}
    .az-folding-box__header__action
      az-switch(
        v-model="localValue")

  .az-folding-box__container(
    v-if="value === true"
    ref="content")
    .az-folding-box__content(
      :class="{'no-padding': nopadding}")
      slot

</template>

<script>

export default {

props: {
  value: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  action: {
    type: String,
    default: 'switch'
  },
  nopadding: {
    type: Boolean,
    default: false
  }
},

watch: {
  value(newValue) {
    this.localValue = newValue;
  },

  localValue(newValue) {
    this.$emit('input', newValue);
    this.$emit('change', newValue);
  }
},

data() {
  return {
    localValue: false
  }
},

methods: {
  // updateState(state){
  //   const boxContent = this.$refs.content;

  //   if(state === true) {
  //     boxContent.style.maxHeight = 'fit-content';
  //   } else {
  //     boxContent.style.maxHeight = '0';
  //   }
  // }
}

}
</script>

<style lang="scss" src="./FoldingBox.component.scss" scoped></style>
