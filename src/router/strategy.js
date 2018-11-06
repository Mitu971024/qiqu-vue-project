import strategy from '../components/strategy/Strategy.vue'
import strDetails from '../components/strategy/strDetails.vue'
import strStart from '../components/strategy/strStart.vue'
import TotalWayStr from '../components/strategy/TotalWayStr.vue'
import TotalClassStr from '../components/strategy/TotalClassStr.vue'
import ToTalRecStr from '../components/strategy/TotalRecStr.vue'
export default [
  {path:'/strategy',component:strategy,
    children:[
      {path:'',component:strStart},
      {path:'totalwaystr',component:TotalWayStr},
      {path:'totalclassstr',component:TotalClassStr},
      {path:'totalrecstr',component:ToTalRecStr},
      {path:':sId',component:strDetails},
    ]
  }
]
