<template lang="pug">
.timerModal(
   @click="closeOnClick && close($event)")

  .timerModal__wrapper
    .timerModal__title.font-weight-bold.padding-half(
      v-if="title") {{title}}
    .timerModal__message.text-center(
      v-if="message") {{ message }}
    .picker-group.padding-half.margin-bottom-double
      scroll-picker.hours-picker(
        :options="hourOptions"
        v-model="hours")
      scroll-picker.minutes-picker(
        :options="minutesOptions"
        v-model="minutes")


    .timerModal__buttons.margin-top(v-if="buttons")
      .timerModal__button.timerModal__button--cancel(
        v-if="cancelBtn"
        @click="cancel") {{ getBtnText(cancelBtnText) }}
      .timerModal__button.timerModal__button--brand(
        v-if="acceptBtn"
            @click="accept") {{ getBtnText(acceptBtnText) }}
</template>

<script>
export default {
props: {
    value: {
      type: Number,
      required: true,
    },

    maxHours: {
      type: Number,
      default: 24,
      validator: value => value >= 0
    },

    maxMinutes: {
      type: Number,
      default: 59,
      validator: value => value >= 0 && value < 60
    },

    maxTime: {
      type: Number,
      default: undefined,
      validator: value => value >= 0 || undefined
    },

    title: {
      type: String,
      required: false
    },

    message: {
      type: String,
      required: false
    },

    buttons: {
      type: Boolean,
      default: false
    },

    backButton: {
      type: Boolean,
      default: false
    },

    acceptBtn: {
      type: Boolean,
      default: true
    },

    cancelBtn: {
      type: Boolean,
      default: true
    },

    cancelBtnText: {
      type: String,
      default() {
        return this.$i18n ? this.$i18n.t('buttons.cancel') : '';
      }
    },

    acceptBtnText: {
      type: String,
      default() {
        return this.$i18n ? this.$i18n.t('buttons.accept') : '';
      }
    },

    textAlign: {
      type: String,
      default: 'center'
    },

    closeOnClick: {
      type: Boolean,
      default: true
    },
},

data() {
  return {
    localValue: 0,
    hours: 0,
    minutes: 0,
    hourOptions: [],
    minutesOptions: []
  }
},

watch: {
  value(newValue) {
    this.localValue = newValue
  },

  localHours(newValue) {
    this.$emit('input', newValue)
  },

  hours(value){
    if(this.maxTime) {
      const maxHours = Math.trunc(this.maxTime / 60);
      this.minutesOptions = [];
      if(value === maxHours) {
        const minutes = this.maxTime - maxHours * 60;
        for(let m = 0; m <= minutes; m++) {
          this.minutesOptions.push({
            name: `${m}m`,
            value: m,
          })
        }
      } else {
        for(let m = 0; m <= 59; m++) {
          this.minutesOptions.push({
            name: `${m}m`,
            value: m,
          })
        }
      }
    }
    this.localValue = this.parseToMinutes();
    this.$emit('input', this.localValue)
  },

  minutes(){
    this.localValue = this.parseToMinutes();
    this.$emit('input', this.localValue)
  }


},

methods: {

  parseToMinutes(){
    const hoursToMinutes = this.hours * 60;

    return hoursToMinutes + this.minutes;
  },

  getBtnText(btnText){
    if(typeof btnText === 'function'){
      return btnText();
    }

    return btnText;
  },

  accept(){

    if(this.callback) {
      console.log("Has callback");
      this.callback('confirm');
      this.clear();
    }


    this.$emit('accept', this.localValue);

  },

  close(e) {
    if(e.target !== e.currentTarget) return;

    if(this.callback) {
      this.callback('cancel');
      this.clear();
    }

    this.$emit('close');
  },

  cancel(e) {
    if(e.target !== e.currentTarget) return;

    if(this.callback) {
      this.callback('cancel');
      this.clear();
    }

    this.$emit('cancel');
  },

  showItemInfo(item) {
    this.$emit('showInfo',item);
  },

  initTimerValues() {
    if(this.maxTime !== undefined) {
      const hours = Math.trunc(this.maxTime / 60);
      const minutes = hours < 1 ? this.maxTime%60 : 59;
      for(let h = 0 ; h <= hours; h++) {
        this.hourOptions.push({
          name: `${h}h`,
          value: h,
        })
      }

      for(let m = 0; m <= minutes; m++) {
        this.minutesOptions.push({
          name: `${m}m`,
          value: m,
        })
      }
    } else {
      for(let h = 0 ; h <= this.maxHours; h++) {
        this.hourOptions.push({
          name: `${h}h`,
          value: h,
        })
      }

      for(let m = 0; m <= this.maxMinutes; m++) {
        this.minutesOptions.push({
          name: `${m}m`,
          value: m,
        })
      }
    }
  },

  initTimer() {
    this.localValue = this.value;
    this.hours = Math.trunc(this.value / 60);
    this.minutes = this.value%60
  }

},

created() {
  this.initTimerValues()
  this.initTimer();
}

}
</script>

<style lang="scss" src="./Timer.component.scss" scoped></style>
