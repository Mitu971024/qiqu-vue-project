<template>
  <div>
    <div class="Rep">
      <div class="row t2">
        <div class="col-xs-4 col-xs-offset-1 text-right t5">
          手机号 ：
        </div>
        <div class="col-xs-2">
          <input type="text" class="form-control leftStyle" placeholder="请输入手机号" v-model="mobile">
          <span :mobile="mobile">{{tiShi1}}</span>
        </div>
      </div>
      <div class="row t2 Span">
        <div class="col-xs-1 col-xs-offset-5">
          <input type="text" class="form-control" placeholder="请输入验证码" v-model="vCode">
        </div>
        <button type="button" class="btn btn-default col-xs-1" @click="sendCode">获取短信验证码</button>
        <span :vCode="vCode" class="span">{{tiShi3}}</span>
      </div>
      <div class="row t2">
        <div class="col-xs-4 col-xs-offset-1 text-right t5">
          新密码 ：
        </div>
        <div class="col-xs-2">
          <input type="password" class="form-control" placeholder="请输入密码" v-model="Pwd1">
          <span :Pwd1="Pwd1">{{tiShi4}}</span>
        </div>
      </div>
      <div class="row t2">
        <div class="col-xs-4 col-xs-offset-1 text-right t5">
          确认密码 ：
        </div>
        <div class="col-xs-2">
          <input type="password" class="form-control" placeholder="请输入相同的密码" v-model="Pwd2">
          <span :Pwd2="Pwd2">{{tiShi5}}</span>
        </div>
      </div>
      <div class="row button1">
        <el-button :plain="true" type="button" class="btn btn-default" @click="modPwd">修改密码</el-button>
      </div>
    </div>
    <app-foot></app-foot>
  </div>

</template>

<script>
  import Foot from '../Foot.vue'
  import axios from 'axios'
    export default {
        name: "Repassword",
      data(){
          return {
            vCode:'',
            Num:'',
            mobile:'',
            Pwd1:'',
            Pwd2:'',
            tiShi1:'',
            tiShi3:'',
            tiShi4:'',
            tiShi5:'',
          }
      },
      components:{
        'app-foot':Foot,
      },
      computed:{
        index(){
          return this.$store.state.index;
        }
      },
      watch:{
        mobile(newmobile,oldmobile) {
          const ha = this;
          axios.post(ha.$store.state.url + '/users/userPhone',{
            mLogin:ha.mobile,
          }).then(function (res) {
            if(res.data.data === 1){
              ha.tiShi1 = '账号为空，或者手机号错误'
            }else {
              ha.tiShi1 = ''
            }
          })
            .catch(function (error) {
              console.log(error);
            });
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
          if(self.mobile === '') {
            self.tiShi1 = '手机号不能为空！'
          }else if(self.vCode === ''){
            self.tiShi3 = '验证码不能为空！'
          }else if(self.Pwd1 === ''){
            self.tiShi4 = '密码不能为空！'
          }else if(self.Pwd2 === ''){
            self.tiShi5 = '密码不能为空！'
          }else if(self.vCode !== self.Num){
            self.tiShi3 = '您输入的验证码错误！'
          }else if(!reg.test(self.Pwd1)){
            self.tiShi4 = '您输入的密码格式不对！'
          }else if(self.Pwd2 !== self.Pwd1){
            self.tiShi5 = '请输入相同的密码！'
          }else {
            const ha = this;
            axios.post(ha.$store.state.url + '/users/userPhone', {
              mLogin: ha.mobile,
            }).then(function (res) {
              if (res.data.data === 1) {
                ha.tiShi1 = '手机号错误!'
              } else {
                axios.post(ha.$store.state.url + '/settings/userPwd', {
                  mPassword: ha.Pwd1,
                  mLogin: ha.mobile,
                }).then(function (res) {
                  ha.$message({
                    showClose: true,
                    message: '密码修改成功，请登录!',
                    type: 'success'
                  });
                  ha.$router.push({path: '/login'});
                }).catch(function (error) {
                    console.log(error);
                });
              }
            }).catch(function (error) {
                console.log(error);
            });
          }
        },
      }
    }
</script>

<style scoped>
  .Rep{
    padding-bottom: 50px;
    height: 530px;
  }
  .row{padding: 0;margin: 0;}
  .t2{margin-top: 3.5%;}
  .t5{margin-top: 0.7%;}
  .button1{margin-top: 6%;}
  .button1>button{width: 16%;}
  .Span{position: relative;}
  .Span .span{
    position: absolute;
    left: 43%;
    bottom: -20px;
  }
  span{color: red;}
</style>
