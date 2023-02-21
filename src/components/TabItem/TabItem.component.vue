<template lang="pug">
  .az-tab(:class="{'az-tab--selected':isActive}")
    router-link(v-if="link !== ''" :to="{name: link}")
      slot

</template>

<script>
export default {

name: 'az-tab',

props: {

  isActive: {
    type: Boolean,
    default: false
  },

  link: {
    type: String,
    default: ''
  }

}

}
</script>

<style src="./TabItem.component.scss" lang="scss" scoped></style>
