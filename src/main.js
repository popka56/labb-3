import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import Vuex from 'vuex'

Vue.use(VueRouter)
Vue.use(Vuex)

import hem from './components/hem.vue'
import api1 from './components/api1.vue'
import api2 from './components/api2.vue'

const router = new VueRouter({
  routes: [{
    path: '/',
    redirect: '/hem'
  }, {
    component: hem,
    path: '/hem'
  }, {
      component: api1,
      path: '/api1'
  }, {
      component: api2,
      path: '/api2'
  },]
})

const store = new Vuex.Store({
  state: {
    someNumber: 5
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
