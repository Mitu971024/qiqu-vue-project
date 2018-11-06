import information from '../components/information/Information.vue'
import infoDetails from '../components/information/infoDetails.vue'
import infoStart from '../components/information/infoStart.vue'
import ToTalHotInfo from '../components/information/TotalHotInfo.vue'
import TotalTodayInfo from '../components/information/TotalTodayInfo.vue'
import TotalNewInfo from '../components/information/TotalNewInfo.vue'
import TotalOtherInfo from '../components/information/TotalOtherInfo.vue'
export default [
  {path:'/information',component:information,
    children:[
      {path:'',component:infoStart},
      {path:'TotalHotInfo',component:ToTalHotInfo},
      {path:'TotalTodayInfo',component:TotalTodayInfo},
      {path:'TotalNewInfo',component:TotalNewInfo},
      {path:'TotalOtherInfo',component:TotalOtherInfo},
      {path:':zId',component:infoDetails},

    ]
  },

]
