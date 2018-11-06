// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store.js'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueLazyLoad from 'vue-lazyload'
import VDistpicker from 'v-distpicker'
import animated from 'animate.css'

Vue.use(animated);
Vue.component('v-distpicker', VDistpicker);
Vue.config.productionTip = false;
Vue.use(Element);
Vue.use(VueLazyLoad,{
  preLoad:1.3,
  error:require(['./assets/images/err.jpg']),
  loading:require(['./assets/images/loding.gif']),
  attempt:1,
  listenEvents: [ 'scroll', 'mousewheel' ]
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
