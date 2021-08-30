import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Common from './common/index'

import 'bootstrap/dist/css/bootstrap.css'
import '@/style/common.css'

Vue.use(Common)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
