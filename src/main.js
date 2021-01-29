import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import toast from '@/components/common/toast'
import FastClick from 'fastclick'

Vue.config.productionTip = false

//vue实例作为总线，事件总线
Vue.prototype.$bus = new Vue()

//安装toast
Vue.use(toast)
//解决300ms延迟
FastClick.attach(document.body)


Vue.use(ElementUI);
new Vue({
  router,
  toast,
  store,
  render: h => h(App)
}).$mount('#app')
