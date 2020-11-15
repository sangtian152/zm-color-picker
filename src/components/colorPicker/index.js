import colorPicker from "./colorPicker.vue";

/* istanbul ignore next */
colorPicker.install = function(Vue) {
  Vue.component(colorPicker.name, colorPicker);
};

export default colorPicker;
