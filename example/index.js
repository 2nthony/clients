import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElvForm from '..'

Vue.use(Element)
Vue.use(ElvForm)

new Vue({
  render: h => h(App)
}).$mount('#app')
