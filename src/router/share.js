import Share from '../components/share/Share.vue'
import ShareInfo from '../components/share/dynamic.vue'
import Details from '../components/share/Details.vue'

export default [
  {path:'/share',component:Share,},
  {path:'/shareInfo',component:ShareInfo,},
  {path:'/share/details', component:Details},
]
