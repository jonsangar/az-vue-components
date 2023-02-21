<template lang="pug">
.weatherIcon(
  v-if="code")
  img(
    v-if="getWeatherIcon"
    :width="size"
    :src="require(`@/assets/icons/weather/${getWeatherIcon}.svg`)"
  )

</template>

<script>
import getWeatherStatus from 'Units/utils/getWeatherStatus';

export default {

  props: {
    code: {
      type: Number,
      required: false
    },

    size: {
      type: String,
      default: '25px'
    },

    date: {
      type: String,
      default() {
        (new Date()).toString();
      }
    },

    sunriseToday: {
      type: String,
      required: false,
    },

    sunsetToday: {
      type: String,
      required: false,
    },

    sunriseTomorrow: {
      type: String,
      required: false,
    },

    sunsetTomorrow: {
      type: String,
      required: false,
    },
  },

  computed: {
    getWeatherIcon() {
    if(!this.code) return '';

    let isDay = true;

    const actualDate = new Date(this.date);

    if(this.sunriseToday && this.sunsetToday &&
      this.sunriseTomorrow && this.sunsetTomorrow){

      const sunriseTodayDate = new Date(this.sunriseToday);
      const sunsetTodayDate = new Date(this.sunsetToday);
      const sunriseTomorrowDate = new Date(this.sunriseTomorrow);
      const sunsetTomorrowDate = new Date(this.sunsetTomorrow);

      if(actualDate < sunriseTodayDate ){
        isDay = false;
      } else if(sunriseTodayDate < actualDate && actualDate < sunsetTodayDate) {
        isDay = true;
      } else if(sunsetTodayDate < actualDate && actualDate < sunriseTomorrowDate) {
        isDay = false;
      } else if(sunriseTomorrowDate < actualDate && actualDate < sunsetTomorrowDate) {
        isDay = true;
      } else {
        isDay = false;
      }
    }


    const weather = getWeatherStatus[this.code]

    if(weather === undefined) return null;

    return (weather.icon_night !== undefined && !isDay) ? weather.icon_night : weather.icon ;
  },
  }

}
</script>
