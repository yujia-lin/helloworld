import Vue from 'vue'
import App from './App'
import wx from 'config/jweixin-1.4.0.js'
Vue.prototype.$wx = wx;
//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
