import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/global.css'
import request from "@/utils/request";

Vue.use(ElementUI,{size: 'small'});

Vue.config.productionTip = false
Vue.prototype.request = request

new Vue({
  router,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  }
}).$mount('#app')
