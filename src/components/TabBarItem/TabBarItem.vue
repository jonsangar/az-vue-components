<template lang="pug">
  .az-tabBarItem(
    :class="tabBarItemClass"
    :style="tabBarItemStyle"
    @click="onClick"
    @keyup="onKeyup")

    .az-tabBarItem__icon(
      v-if="icon"
      :class="{'az-tabBarItem__icon--dot': dot && !info}")

      //- Icono
      az-icon(:name="icon" :scale="scale")

      //- .az-tabBarItem__disabled(v-if="disabled")
      //-   az-icon(name="lock" scale=".5")

      //- Badge / Dot
      .az-tabBarItem__badge(v-if="info") {{ info }}

    //- title
    .az-tabBarItem__title(v-if="$slots.default")
      slot
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: false,
    },
    name: {
      type: [Number, String],
      required: false,
    },
    dot: {
      type: Boolean,
      default: false,
    },
    info: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      dafault: false
    },
    scale: {
      type: String,
      default: "1"
    },
    to: {
      type: [String, Object],
      required: false,
    },
  },

  data() {
    return {
      active: false,
    };
  },

  computed: {
    routeActive() {
      if (!this.to || !this.$router || this.$router.name) return false;

      const toName = typeof this.to === 'object' ? this.to.name : this.to;
      const routeName = this.$router.history.current.name;

      return toName === routeName;
    },

    index() {
      return this.$parent.$children.indexOf(this);
    },

    tabBarItemClass() {
      return [
        this.$slots.default ? 'az-tabBarItem--title' : '',
        this.active ? 'az-tabBarItem--active' : '',
        this.disabled ? 'az-tabBarItem--disabled' : ''
      ];
    },

    tabBarItemStyle() {
      return {
        color:
          this.active || this.routeActive
            ? this.$parent.$options.propsData.activeColor
            : this.$parent.$options.propsData.inactiveColor,
      };
    },
  },

  methods: {
    onClick(event) {
      this.$parent.onChange(this.name || this.index);
      this.$emit('click', event);

      if (this.to) {
        const route = typeof this.to === 'object' ? this.to : { name: this.to };
        this.$router.push(route).catch(() => {});
      }
    },

    onKeyup (event) {
      this.$emit('keyup', event);
    }
  },
};
</script>

<style src="./TabBarItem.scss" lang="scss"></style>
