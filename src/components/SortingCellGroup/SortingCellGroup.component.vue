<template lang="pug">
.az-sorting-group
  SortingCell(
    v-if="title"
    :itemID="itemID"
    :name="title"
    :settingsActive="settingsActive"
    :activeHandle="activeHandle"
    :validation="validation"
    :isHeader="true"
    :keyboardAdjust="keyboardAdjust"
    @focus="activeEditMode"
    @save="saveData")
  slot
</template>

<script>
import SortingCell from '../SortingCell';

export default {
  components: { SortingCell },

  props: {
    title: {
      type: String,
      default: ''
    },

    validation: {
      type: String,
      default: ''
    },

    settingsActive: {
      type: Boolean,
      default: false
    },

    activeHandle: {
      type: Boolean,
      default: true
    },

    itemID: {
      type: String,
      required: false
    },

    keyboardAdjust: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    saveData(data) {
      this.$emit('save',data);
    },

    activeEditMode() {
      this.$emit('focus');
    }
  }

}
</script>

<style lang="scss" src="./SortingCellGroup.component.scss" scoped></style>
