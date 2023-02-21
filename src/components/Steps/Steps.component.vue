<template lang="pug">
  .az-steps--horizontal(
  :active="active"
  activeColor="var(color--success)")
    .az-steps__items
      slot
    .az-steps__line


</template>

<script>
export default {

  data() {

    return {
      active: 0
    }

  }
  // props: {
  //   activeColor: {
  //     type: String,
  //     default: 'red',
  //   },
  //   inactiveIcon: {
  //     type: String,
  //     default: 'dot'
  //   },
  //   inactiveColor: {
  //     type: String,
  //     default: '#777777'
  //   },
  //   activeIcon: {
  //     type: String,
  //     default: 'checked'
  //   },
  // }

}
</script>

<style lang="scss" src="./Steps.component.scss" scoped></style>
