import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/color-brewer.css'
import './assets/styles/index.scss'
import 'view-design/dist/styles/iview.css'
// 文档组件引入
import DemoBlock from './components/demo-block.vue'
import MainHeader from './components/header.vue'
import MainFooter from './components/footer.vue'
import SideNav from './components/side-nav.vue'
//导入通用样式
import "@/styles/index.scss";
import ZmColorPicker from "@/index";
Vue.use(ZmColorPicker)

Vue.component('DemoBlock', DemoBlock)
Vue.component('MainHeader', MainHeader)
Vue.component('MainFooter', MainFooter)
Vue.component('SideNav', SideNav)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
