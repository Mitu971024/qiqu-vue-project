<template>
  <div>
    <div class="container">
      <h2 class="text-left formStyle1">登录</h2>
      <hr/>
      <div class="row">
        <div class="col-xs-6 borderL">
          <form>
            <div class="row formStyle">
              <input type="text" class="form-control" placeholder="请输入手机号" v-model="mobile">
              <span :mobile="mobile">{{tiShi}}</span>
            </div>
            <div class="row formStyle1">
              <input type="password" class="form-control" placeholder="请输入密码" v-model="mPwd">
              <span :mPwd="mPwd">{{tiShi2}}</span>
            </div>
            <div class="text-right formP">
              <p><a class="aStyle" @click="Rep">忘记密码</a></p>
            </div>
          </form>
          <el-button :plain="true" class="formStyle2" @click="userLogin">登录</el-button>
        </div>
        <div class="col-xs-6">
          <div class="row zcStyle text-left">
            <h3>快速注册</h3>
          </div>
          <div class="row zcStyle1 text-left">
            <p>仅需三步，即可立即完成注册。<br>
              尽享全站功能与服务</p>
          </div>
          <router-link tag="button" to="/register" class="btn btn-default zcStyle2" >立即注册</router-link>
        </div>
      </div>
    </div>
    <app-foot></app-foot>
    <router-view></router-view>
  </div>
</template>

<script>
  import Foot from '../Foot.vue'
  import axios from 'axios'
  export default {
    name: "Login",
    data(){
      return {
        mobile:'',
        mPwd:'',
        tiShi:'',
        tiShi2:'',
      }
    },
    components:{
      'app-foot':Foot,
    },
    computed:{
      url(){
        return this.$store.state.url;
      }
    },
    watch:{
      mobile(newmobile,oldmobile) {
        const ha = this;
        axios.post(this.$store.state.url + '/users',{
          mLogin:this.mobile,
          mPassword:this.mPwd,
        }).then(function (res) {
          if(res.data.data === 2){
            ha.tiShi = '账号为空，或者手机号错误'
          }else {
            ha.tiShi = ''
          }
        })
          .catch(function (error) {
            console.log(error);
          });
      },
      mPwd(newmobile,oldmobile) {
        const ha = this;
        axios.post(this.$store.state.url + '/users',{
          mLogin:this.mobile,
          mPassword:this.mPwd,
        }).then(function (res) {
          if(res.data.data === 3){
            ha.tiShi2 = '密码为空，或者密码错误'
          }else{
            ha.tiShi2 = ''
          }
        })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    methods:{
      userLogin(){
        const self = this;
        if(self.mobile == '') {
          self.tiShi = '手机号不能为空！'
        }else if(self.mPwd == ''){
          self.tiShi2 = '密码不能为空！'
        }else{
          axios.post(this.$store.state.url + '/users', {
            mLogin: this.mobile,
            mPassword: this.mPwd,
          }).then(function (res) {
            if (res.data.message == 1) {
              if(!window.localStorage){
                alert("浏览器支持localstorage");
              }else{
                const storage = window.localStorage;
                const index = res.data.message;
                const data = res.data.data;
                const mId = data.mId;
                const mLogin = data.mLogin;
                const mName = data.mName;
                const mSex = data.mSex;
                const mCity = data.mCity;
                const mAge = data.mAge;
                const mHeight = data.mHeight;
                const mWigth = data.mWigth;
                const mPassword = data.mPassword;
                const mImg = data.mImg;
                const mPlace = data.mPlace;
                const mGxqm = data.mGxqm;
                storage.setItem("index",index);
                storage.setItem("mId",mId);
                storage.setItem("mLogin",mLogin);
                storage.setItem("mName",mName);
                storage.setItem("mSex",mSex);
                storage.setItem("mCity",mCity);
                storage.setItem("mAge",mAge);
                storage.setItem("mHeight",mHeight);
                storage.setItem("mWigth",mWigth);
                storage.setItem("mPassword",mPassword);
                storage.setItem("mImg",mImg);
                storage.setItem("mPlace",mPlace);
                storage.setItem("mGxqm",mGxqm);
                self.$store.state.index = storage.index;
              }
              self.$message({
                showClose: true,
                message: '登录成功!',
                type: 'success'
              });
              self.$router.replace('/');
            }
          })
            .catch(function (error) {
              console.log(error);
            });
        }
      },
      Rep(){
        this.$router.push('/Repassword')
      }
    }
  }
</script>

<style scoped>
  hr{border-top: 2px solid #999;}
  .borderL{
    height: 500px;
    border-right: 2px solid #999;
    margin-bottom: 20px;
  }
  span{color: red;}
  .formStyle{margin-top: 120px;}
  .formStyle1{margin-top:50px;}
  .formP{margin-top:20px;margin-right: 20%}
  .aStyle{text-decoration: none;color: #999;cursor: pointer;}
  .aStyle:hover{color: #5dc7c6}
  .formStyle2{margin-top: 40px;width: 60%;}
  .form-control{width: 60%;margin-left: 20%}
  .zcStyle{margin-top: 100px;color: #999;margin-left: 20%}
  .zcStyle1{margin-top:50px;color: #999;margin-left: 20%}
  .zcStyle2{margin-top:70px;width: 60%;}
</style>

