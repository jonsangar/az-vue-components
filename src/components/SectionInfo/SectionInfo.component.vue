<template lang="pug">
.sectionInfo
  .sectionInfo__title {{ title }}
  .sectionInfo__info(
    :class="getClass") {{ info }}
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },

    info: {
      type: String,
      default: ''
    },

    mode: {
      type: String,
      default: ''
    }

  },

  computed: {
    getClass() {
      return this.mode ? `sectionInfo__info--${this.mode}` : ''
    }
  }

}
</script>

<style lang="scss" src="./SectionInfo.component.scss" scoped></style>
