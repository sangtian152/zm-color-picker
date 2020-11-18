<template>
  <div class="zm-color-predefine">
    <template v-for="(color, index) in predefine">
      <div
        :key="index"
        :class="[
          'zm-color-predefine__color',
          { selected: index === activeIndex }
        ]"
        @click="handlePredefine(index, color)"
      >
        <div :style="{ 'background-color': color }"></div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "ColorPredefine",
  props: {
    predefine: Array
  },
  data() {
    return {
      activeIndex: ""
    };
  },
  methods: {
    handlePredefine(index, color) {
      this.activeIndex = index;
      console.log(color);
      this.$emit("on-predefine", color);
    }
  }
};
</script>

<style></style>
