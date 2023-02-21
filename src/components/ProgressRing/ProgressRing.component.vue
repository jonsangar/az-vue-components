<template lang="pug">
.dashed-circle-progress(
  :style="componentDimension")
  svg(
    :height="radius * 2"
    :width="radius * 2")
    defs
      mask(
        :id="`mask-${uid}`"
        :height="radius * 2"
        :width="radius * 2"
        )
        circle(
        class="progress-ring__circle"
        stroke="white"
        fill="transparent"
        :stroke-dasharray="circumference + ' ' + circumference"
        :style="{ strokeDashoffset }"
        :stroke-width="stroke"
        :r="normalizedRadius"
        :cx="radius"
        :cy="radius")


    circle(
      :stroke="color2 ? color2 : color"
      fill="transparent"
      style="opacity: 0.3"
      :stroke-dasharray="dashWeight"
      :stroke-width="stroke"
      :r="normalizedRadius"
      :cx="radius"
      :cy="radius")

    circle(
      :stroke="color"
      fill="transparent"
      :stroke-dasharray="dashWeight"
      :style="`mask: url('#mask-${uid}'); opacity: 1`"
      :stroke-width="stroke"
      :r="normalizedRadius"
      :cx="radius"
      :cy="radius")

  .textInfo(
    :style="textStyle")

    .progress(v-if="showProgress")
      | {{ progress }}
    .label(v-else-if="label")
      | {{ label }}

</template>

<script>
export default {
  props: {
    radius: {
      type: Number,
      required: true
    },
    progress: {
      type: Number,
      required: true
    },
    stroke: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    color2: {
      type: String,
      required: false
    },
    showProgress: {
      type: Boolean,
      default: false
    },
    dashWeight: {
      type: Number,
      default: 2
    },
    label: {
      type: String,
      required: false
    }
  },
  data() {
    const normalizedRadius = this.radius - this.stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    return {
      normalizedRadius,
      circumference,
      uid: this._uid
    }
  },

  computed: {
    componentDimension() {
      return {
        width: `${this.radius * 2}px`,
        height: `${this.radius * 2}px`
      }
    },

    textStyle() {
      return {
        color: this.color,
        maxWidth: `${this.radius}px`
      }
    },

    strokeDashoffset() {
      return this.circumference - this.progress / 100 * this.circumference;
    }
  },

  created() {
    this.uid = this._uid
  },

}
</script>

<style lang="scss" src="./ProgressRing.component.scss" scoped></style>
