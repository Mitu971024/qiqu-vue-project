import Home from '../components/Home.vue'
import User from '../components/user/User.vue'
import Setting from '../components/user/Setting.vue'
import Login from '../components/user/Login.vue'
import Register from '../components/user/Register.vue'

export default [
  {
    path: '/',
    component: Home,
    children:[
      {path:'',component:User},
      {path:'setting',component:Setting},
    ]
  },
  {path: '/login',component:Login},
  {path: '/register',component:Register},
]
