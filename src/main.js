import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import store from '@/store/store'
import 'element-ui/lib/theme-chalk/index.css'
import 'echarts'
import ECharts from 'vue-echarts'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.component('v-chart', ECharts)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
