  <template lang="pug">
  .DropdownCell
    .DropdownCell__header(@click="click")
      slot
    .DropdownCell__body(
      v-if="dropdownActive"
    )
      slot(name="body")

  </template>

  <script>
  export default {
  props: {

    dropdownActive: {
      type: Boolean,
      default: true
    },

  },

  methods: {
    click(e) {
      this.$emit('click',e)
    }

  }

  }
  </script>

  <style lang="scss" src="./DropdownCell.component.scss"></style>
