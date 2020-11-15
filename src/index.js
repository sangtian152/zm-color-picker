// ES6 API兼容处理
import "@/utils/polyfill";
// 核心插件
import corePlugin from "./plugin/core";
// 组件
import ZmColorPicker from "./components/colorPicker";

import "@/styles/index.scss";
const components = [ZmColorPicker];

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  Vue.use(corePlugin);
};

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ZmColorPicker
};
