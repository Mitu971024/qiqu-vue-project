import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    index:'',
    mId:'',
    mLogin:'',
    mName:'',
    mSex:'',
    mCity:'',
    mAge:'',
    mHeight:'',
    mWigth:'',
    mPassword:'',
    mImg:'',
    mPlace:'',
    mGxqm:'',
    myPic:'',
    // url:'http://xx.xx.x.xx:3000',   这个是连接后端接口的配置
    url:'http://10.40.4.24:3000',
  }
})
