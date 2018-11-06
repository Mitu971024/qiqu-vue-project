import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import home from './home.js'
import information from './information.js'
import strategy from './strategy.js'
import bike from './bike.js'
import share from './share.js'
import err from './err.js'

export default new Router({
  routes: [
    ...home,
    ...information,
    ...strategy,
    ...bike,
    ...share,
    ...err,
  ],
  mode:'history'
})

