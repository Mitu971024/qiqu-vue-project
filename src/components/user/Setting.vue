<template>
  <div>
    <div class="container">
      <div class="row rowH">
        <div class="col-xs-2 left">
          <div class="img"><img :src="myPic" alt=""></div>
          <div class="mySet">个人设置</div>
        </div>
        <div class="col-xs-10 right">
          <nav class="navbar navbar-default">
            <div class="collapse navbar-collapse">
              <ul class="nav navbar-nav liStyle">
                <li class="col-xs-3 liActive" @click="liOne" ref="liStyle1"><a>我的信息</a></li>
                <li class="col-xs-3" @click="liTwo" ref="liStyle2"><a>头像设置</a></li>
                <li class="col-xs-3" @click="liThree" ref="liStyle3"><a>修改密码</a></li>
                <li class="col-xs-3" @click="liFour" ref="liStyle4"><a>其它设置</a></li>
              </ul>
            </div>
          </nav>
          <div v-if="numLi == 1">
            <div class="row t1">
              <div class="col-xs-4 text-right">
                登录账号 :
              </div>
              <div class="col-xs-2">
                {{Login}}
              </div>
            </div>
            <div class="row t2">
              <div class="col-xs-4 text-right t5">
                昵称 :
              </div>
              <div class="col-xs-4">
                <input type="text" class="form-control" placeholder="请输入昵称" v-model="nikeName">
              </div>
            </div>
            <div class="row t2">
              <div class="col-xs-4 text-right">
                性别 :
              </div>
              <div class="col-xs-4">
                <label class="radio-inline col-xs-2">
                  <input type="radio" name="mSexOptions" id="mSex1" value="1" v-model="mSex">男
                </label>
                <label class="radio-inline col-xs-2">
                  <input type="radio" name="mSexOptions" id="mSex2" value="0" v-model="mSex">女
                </label>
              </div>
            </div>
            <div class="row t2">
              <div class="col-xs-4 text-right t5">
                城市 :
              </div>
              <div class="col-xs-3">
                <el-cascader
                  :options="options"
                  :show-all-levels="false"
                  v-model="city"
                ></el-cascader>
              </div>
            </div>
            <div class="row t2">
              <div class="col-xs-4 text-right t5">
                年龄 :
              </div>
              <div class="col-xs-4">
                <input type="text" class="form-control" placeholder="请输入年龄" v-model="Age">
              </div>
            </div>
            <div class="row t2">
              <div class="col-xs-4 text-right t5">
                身高 :
              </div>
              <div class="col-xs-4">
                <input type="text" class="form-control" placeholder="请输入身高" v-model="Height">
              </div>
              <div class="co-xs-1 text-left t5">
                cm
              </div>
            </div>
            <div class="row t2">
              <div class="col-xs-4 text-right t5">
                体重 :
              </div>
              <div class="col-xs-4">
                <input type="text" class="form-control" placeholder="请输入体重" v-model="Weight">
              </div>
              <div class="co-xs-1 text-left t5">
                kg
              </div>
            </div>
            <div class="row t2">
              <div class="col-xs-4 text-right t5">
                个性签名 :
              </div>
              <div class="col-xs-4">
                <input type="text" class="form-control" placeholder="请输入个性签名" v-model="Gxqm">
              </div>
            </div>
            <div class="row button1">
              <el-button :plain="true" type="button" class="btn btn-default" @click="modInfo">保存</el-button>
            </div>
          </div>
          <div v-else-if="numLi == 2">
            <div class="row t1">
              <div class="col-xs-4 col-xs-offset-1">
                <h4 class="t5">上传本地照片 :</h4>
              </div>
              <div class="inputStyle col-xs-4">
                <input type="file" name="avatar"
                       @change="changeImage($event)"
                       accept="image/gif,image/jpeg,image/jpg,image/png"
                       ref="avatarInput">
              </div>
              <div class="row button2">
                <button type="button" class="btn btn-default" @click="edit">上传头像</button>
              </div>
            </div>
          </div>
          <div v-else-if="numLi == 3">
            <div class="row t1">
              <h4 class="h4Color">温馨提示 : 请先进行短信验证之后，才能修改密码 !</h4>
            </div>
            <div class="row t2">
              <div class="col-xs-4 text-right t5">
                手机号 ：
              </div>
              <div class="col-xs-4">
                <input type="text" class="form-control leftStyle" placeholder="请输入手机号" v-model="mobile">
                <span :mobile="mobile">{{tiShi1}}</span>
              </div>
            </div>
            <div class="row t2">
              <div class="col-xs-2 col-xs-offset-3">
                <input type="text" class="form-control" placeholder="请输入验证码" v-model="vCode">
              </div>
              <button type="button" class="btn btn-default col-xs-2" @click="sendCode">获取短信验证码</button>
              <span :vCode="vCode">{{tiShi3}}</span>
            </div>
            <div class="row t2">
              <div class="col-xs-4 text-right t5">
                新密码 ：
              </div>
              <div class="col-xs-4">
                <input type="password" class="form-control" placeholder="请输入密码" v-model="Pwd1">
                <span :Pwd1="Pwd1">{{tiShi4}}</span>
              </div>
            </div>
            <div class="row t2">
              <div class="col-xs-4 text-right t5">
                确认密码 ：
              </div>
              <div class="col-xs-4">
                <input type="password" class="form-control" placeholder="请输入相同的密码" v-model="Pwd2">
                <span :Pwd2="Pwd2">{{tiShi5}}</span>
              </div>
            </div>
            <div class="row button1">
              <el-button :plain="true" type="button" class="btn btn-default" @click="modPwd">修改密码</el-button>
            </div>
          </div>
          <div v-else="numLi == 4">
            <div class="row t1">
              <div class="col-xs-4 col-xs-offset-1">
                是否公开信息 :
              </div>
              <label class="radio-inline col-xs-3 text-left">
                <input type="radio" name="inForOptions" id="inFor1" value="1" v-model="Place">公开
              </label>
              <label class="radio-inline col-xs-3 text-left">
                <input type="radio" name="inForOptions" id="inFor2" value="0" v-model="Place">仅好友可见
              </label>
            </div>
            <div class="row button4">
              <el-button :plain="true" type="button" class="btn btn-default" @click="modOther">保存</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-foot></app-foot>
  </div>
</template>

<script>
  import Foot from '../Foot.vue'
  import axios from 'axios'
  export default {
    name: "Setting",
    data(){
      return {
        numLi:1,
        myPic:'',
        Login:'',
        nikeName:'',
        Age:'',
        mSex:'',
        Height:'',
        Weight:'',
        Gxqm:'',
        options: [
          {value: '北京', label: '北京',},
          {value: '天津', label: '天津',},
          {value: '河北', label: '河北',},
          {value: '山西', label: '山西',},
          {value: '内蒙古', label: '内蒙古',},
          {value: '辽宁', label: '辽宁',},
          {value: '吉林', label: '吉林',},
          {value: '黑龙江', label: '黑龙江',},
          {value: '上海', label: '上海',},
          {value: '江苏', label: '江苏',},
          {value: '浙江', label: '浙江',},
          {value: '安徽', label: '安徽',},
          {value: '福建', label: '福建',},
          {value: '江西', label: '江西',},
          {value: '山东', label: '山东',},
          {value: '河南', label: '河南',},
          {value: '湖北', label: '湖北',},
          {value: '湖南', label: '湖南',},
          {value: '广东', label: '广东',},
          {value: '广西', label: '广西',},
          {value: '海南', label: '海南',},
          {value: '重庆', label: '重庆',},
          {value: '四川', label: '四川',},
          {value: '贵州', label: '贵州',},
          {value: '云南', label: '云南',},
          {value: '西藏', label: '西藏',},
          {value: '陕西', label: '陕西',},
          {value: '甘肃', label: '甘肃',},
          {value: '宁夏', label: '宁夏',},
          {value: '新疆', label: '新疆',},
          {value: '台湾', label: '台湾',},
          {value: '香港', label: '香港',},
          {value: '澳门', label: '澳门',},
        ],
        city:[''],
        City:'',
        upath:'',  //保存选中的文件
        mydata:'',
        vCode:'',
        Num:'',
        mobile:'',
        Pwd1:'',
        Pwd2:'',
        tiShi1:'',
        tiShi3:'',
        tiShi4:'',
        tiShi5:'',
        Place:'',
      };
    },
    computed:{
      index(){
        return this.$store.state.index;
      },
      mId(){
        return this.$store.state.mId;
      },
      url(){
        return this.$store.state.url;
      }
    },
    mounted(){
      this.init();
    },
    components:{
      'app-foot':Foot,
    },
    watch:{
      mobile(newmobile,oldmobile){
        const ha = this;
        const object=eval("("+ window.localStorage.getItem("data") +")");
        if(ha.mobile != object.mLogin){
          ha.tiShi1 = '手机号为空或者您输入的手机号不正确！'
        }else{
          ha.tiShi1 = ''
        }
      },
      vCode(newmobile,oldmobile){
        const ha = this;
        if(ha.vCode != ha.Num){
          ha.tiShi3 = '验证码为空或者输入的验证码不正确！'
        }else {
          ha.tiShi3 = ''
        }
      },
      Pwd1(newmPwd,oldmPwd){
        const ha = this;
        const reg = /^([a-zA-Z0-9]|[._]){6,12}$/;
        if(!reg.test(ha.Pwd1)){
          ha.tiShi4 = '请输入6-12个数字、字母或者带“_”、“.”的密码'
        }else {
          ha.tiShi4 = ''
        }
      },
      Pwd2(newmPwd,oldmPwd){
        const ha = this;
        if(ha.Pwd2 != ha.Pwd1){
          ha.tiShi5 = '请输入相同的密码'
        }else {
          ha.tiShi5 = ''
        }
      },
    },
    methods:{
      init(){
        const self = this;
        self.Login = window.localStorage.mLogin;
        self.myPic = self.$store.state.url + window.localStorage.mImg;
        self.nikeName = window.localStorage.mName;
        self.Age = window.localStorage.mAge;
        self.mSex = window.localStorage.mSex;
        self.Height = window.localStorage.mHeight;
        self.Weight = window.localStorage.mWigth;
        self.Gxqm = window.localStorage.mGxqm;
        self.city = window.localStorage.mCity.split(",");
        self.Place = window.localStorage.mPlace;
      },
      liOne(){
        this.numLi = 1;
        this.$refs.liStyle1.className = 'col-xs-3 liActive';
        this.$refs.liStyle2.className = 'col-xs-3';
        this.$refs.liStyle3.className = 'col-xs-3';
        this.$refs.liStyle4.className = 'col-xs-3';
      },
      liTwo(){
        this.numLi = 2;
        this.$refs.liStyle1.className = 'col-xs-3';
        this.$refs.liStyle2.className = 'col-xs-3';
        this.$refs.liStyle2.className = 'col-xs-3 liActive';
        this.$refs.liStyle3.className = 'col-xs-3';
      },
      liThree(){
        this.numLi = 3;
        this.$refs.liStyle1.className = 'col-xs-3';
        this.$refs.liStyle2.className = 'col-xs-3';
        this.$refs.liStyle3.className = 'col-xs-3 liActive';
        this.$refs.liStyle4.className = 'col-xs-3';
      },
      liFour(){
        this.numLi = 4;
        this.$refs.liStyle1.className = 'col-xs-3';
        this.$refs.liStyle2.className = 'col-xs-3';
        this.$refs.liStyle3.className = 'col-xs-3';
        this.$refs.liStyle4.className = 'col-xs-3 liActive';
      },
      modInfo(){
        const self = this;
        axios.post(this.$store.state.url + '/settings/modify',
          {
            mName: self.nikeName,
            mSex: self.mSex,
            mCity: self.city[0],
            mAge: self.Age,
            mHeight: self.Height,
            mWigth: self.Weight,
            mGxqm: self.Gxqm,
            mId: window.localStorage.mId,
          }).then(function (res) {
          self.$message({
            showClose: true,
            message: '信息修改成功!',
            type: 'success'
          });
          }).catch(function (error) {
            console.log(error);
          });
        setTimeout(function(){
          axios.post(`${self.$store.state.url}/settings/one`, {
            mId: window.localStorage.mId
          }).then(function (res) {
            const storage = window.localStorage;
            const data = res.data.data[0];
            const mName = data.mName;
            const mSex = data.mSex;
            const mCity = data.mCity;
            const mAge = data.mAge;
            const mHeight = data.mHeight;
            const mWigth = data.mWigth;
            const mGxqm = data.mGxqm;
            storage.setItem("mName",mName);
            storage.setItem("mSex",mSex);
            storage.setItem("mCity",mCity);
            storage.setItem("mAge",mAge);
            storage.setItem("mHeight",mHeight);
            storage.setItem("mWigth",mWigth);
            storage.setItem("mGxqm",mGxqm);
            self.nikeName = window.localStorage.mName;
            self.city = window.localStorage.mCity.split(",");
            self.Age = window.localStorage.mAge;
            self.mSex = window.localStorage.mSex;
            self.Height = window.localStorage.mHeight;
            self.Weight = window.localStorage.mWigth;
            self.Gxqm = window.localStorage.mGxqm;
          })
        }, 500);
      },
      edit() {
        const self = this;
        var zipFormData = new FormData();
        //依次添加多个文件
        for(var i = 0 ; i< this.upath.length ; i++){
          zipFormData.append('filename', this.upath[i]);
        }
        //添加其他的表单元素
        zipFormData.append('mId',window.localStorage.mId);
        let config = { headers: { 'Content-Type': 'multipart/form-data' } };
        axios.post(`${this.$store.state.url}/settings/uploadfile`, zipFormData,config)
          .then(function (res) {
            // console.log(res);
            // console.log(res.data);
            // console.log(res.bodyText);
          });
        setTimeout(function(){
          axios.post(`${self.$store.state.url}/settings/one`, {
            mId: window.localStorage.mId
          }).then(function (res) {
            const storage = window.localStorage;
            const data = res.data.data[0];
            const mImg = data.mImg;
            storage.setItem("mImg",mImg);
            self.myPic = self.$store.state.url + window.localStorage.mImg;
          })
        }, 500);
      },
      //选中文件后，将文件保存到实例的变量中
      changeImage(e) {
        this.upath = e.target.files;
      },
      sendCode(){
        const self = this;
        const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if(!(reg.test(self.mobile))){
          self.tiShi1 = '请输入正确的手机号！'
        }else{
          self.Num = '';
          let num = self.Num;      //容器
          for(let i =0;i<6;i++){   //循环六次
            num += Math.floor(Math.random()*10);
          }
          self.Num = num;
          console.log(self.Num)
          // 短信验证
          // axios.get('/proxy?mobile=' + self.mobile + '&tpl_id=107464&tpl_value=%23code%23%3D' +
          // self.Num + '&key=聚合申请的密钥')
          //  //  .then((res)=>{
          //     console.log(res)
          //   }).catch(err=>{console.log(err)})
        }
      },
      modPwd(){
        const self = this;
        const reg = /^([a-zA-Z0-9]|[._]){6,12}$/;
        if(self.mobile == '') {
          self.tiShi1 = '手机号不能为空！'
        }else if(self.vCode == ''){
          self.tiShi3 = '验证码不能为空！'
        }else if(self.Pwd1 == ''){
          self.tiShi4 = '密码不能为空！'
        }else if(self.Pwd2 == ''){
          self.tiShi5 = '密码不能为空！'
        }else if(self.vCode != self.Num){
          self.tiShi3 = '您输入的验证码错误！'
        }else if(!reg.test(self.Pwd1)){
          self.tiShi4 = '您输入的密码格式不对！'
        }else if(self.Pwd2 != self.Pwd1){
          self.tiShi5 = '请输入相同的密码！'
        } else{
          axios.post(this.$store.state.url + '/settings/modPwd', {
            mPassword: self.Pwd1,
            mId: window.localStorage.mId,
          }).then(function (res) {
            self.$message({
              showClose: true,
              message: '密码修改成功，请重新登录!',
              type: 'success'
            });
            if(!window.localStorage){
              alert("浏览器支持localstorage");
            }else{
              const storage = window.localStorage;
              storage.index = '';
              self.$store.state.index = storage.index;
              // storage.removeItem("data");
              self.$router.push({path: '/login'});
            }
          })
            .catch(function (error) {
              console.log(error);
            });
        }
      },
      modOther(){
        const self = this;
        axios.post(this.$store.state.url + '/settings/modOther',
          {
            mPlace: self.Place,
            mId: window.localStorage.mId,
          }).then(function (res) {
          self.$message({
            showClose: true,
            message: '信息修改成功!',
            type: 'success'
          });
        }).catch(function (error) {
          console.log(error);
        });
        setTimeout(function(){
          axios.post(`${self.$store.state.url}/settings/one`, {
            mId: window.localStorage.mId
          }).then(function (res) {
            const storage = window.localStorage;
            const data = res.data.data[0];
            const mPlace = data.mPlace;
            storage.setItem("mPlace",mPlace);
            self.Place = window.localStorage.mPlace;
          })
        }, 500);
      },
    },
  }
</script>

<style scoped>
  .rowH{height: 940px;}
  .left{
    height: 900px;
    margin-top: 20px;
    background: rgb(69,69,69);
    padding: 0;
  }
  .img{
    width: 165px;
    height: 165px;
    background-color: white;
    border-radius: 80px;
    margin-top: 50px;
    margin-left: 15px;
  }
  .img>img{
    width: 165px;
    height: 165px;
    border-radius: 80px;
  }
  .mySet{
    width: 195px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    margin-top: 50px;
    font-size: 20px;
    background-color: #777;
    color: white;
  }
  .right{
    height: 880px;
    margin-top: 20px;
    padding: 0;
  }
  .navbar-default{
    background-color: white;
    border: 0;
  }
  .liStyle{
    margin-top: 80px;
    width: 965px;
    margin-left: 10px;
    border-bottom: 1px solid #666;
  }
  .liStyle>li{
    cursor: pointer;
  }
  .liActive{
    font-size: 22px;
    font-weight: bolder;
  }
  .liStyle>li:hover{font-weight: bold;}
  .t1{margin-top: 8%;}
  .inputStyle{
    width: 200px;
    height: 200px;
    padding: 0;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
  }
  .inputStyle input{
    width: 200px;
    height: 200px;
  }
  .t2{margin-top: 3.5%;}
  .t5{margin-top: 0.7%;}
  .button1{margin-top: 8%;}
  .button1>button{width: 16%;}
  .button2{margin-top: 22%;}
  .button2>button{width: 16%;}
  .button4{margin-top: 20%;}
  .button4>button{width: 16%;}
  span{color: red;}
  .h4Color{color: #666;}
</style>
