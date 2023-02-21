<template lang="pug">
.pincode
  .pincode__mask

  .pincode__wrapper
    .pincode-input
      .pincode-input__digit
        input(
          type='number'
          min="0"
          max="9")
      .pincode-input__digit
        input(
          type='number'
          min="0"
          max="9")
      .pincode-input__digit
        input(
          type='number'
          min="0"
          max="9")
      .pincode-input__digit
        input(
          type='number'
          min="0"
          max="9")

    .pincode-keyboard
      .row
        .pincode-keyboard__key.pincode-keyboard__key--1 1
        .pincode-keyboard__key.pincode-keyboard__key--2 2
        .pincode-keyboard__key.pincode-keyboard__key--3 3
      .row
        .pincode-keyboard__key.pincode-keyboard__key--4 4
        .pincode-keyboard__key.pincode-keyboard__key--5 5
        .pincode-keyboard__key.pincode-keyboard__key--6 6
      .row
        .pincode-keyboard__key.pincode-keyboard__key--7 7
        .pincode-keyboard__key.pincode-keyboard__key--8 8
        .pincode-keyboard__key.pincode-keyboard__key--9 9
      .row
        .pincode-keyboard__key.pincode-keyboard__key--0 0
</template>

<script>
export default {

}
</script>

<style lang="scss" src="./Pincode.component.scss" scoped></style>
