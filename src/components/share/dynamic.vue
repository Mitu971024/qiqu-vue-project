<template>
  <div>
    <div class="box">
      <div class="send_temp">
        <div class="bg_img"></div>
        <div>
          <h2>精彩一刻</h2>
          <p class="title_info">放下所有的包袱，带上有趣的灵魂，感受骑行的乐趣.....</p>
          <hr>
        </div>
        <div class="form">
          <textarea v-model="input_text" @keyup="infos" placeholder="请输入..."></textarea>
          <span class="cover glyphicon glyphicon-picture"></span>
          <input type="file" class="files" multiple @change="changeImage($event)"  ref="avatarInput" accept="image/gif,image/jpeg,image/jpg,image/png">
          <button class="reset" @click="clear">清空</button>
          <button class="send" @click="send">发送</button>
        </div>
      </div>
      <showlist :current_info="current_info"></showlist>
    </div>
    <app-foot></app-foot>
  </div>
</template>

<script>
  import axios from 'axios'
  import Foot from '../Foot'
  import showlist from './showlist';
  import moment from 'moment';
  export default {
    name: "dynamic",
    components:{
      showlist,
      "app-foot":Foot,
    },
    data(){
      return{
        images: null,     //在此保存选中的图片
        current_time:'',  //当前时间
        u_name:'',        //用户名
        u_pic:'',         //用户头像
        input_text:'',    //输入框内容
        current_info:null,
      }
    },
    computed:{
      url(){
        return this.$store.state.url;
      },
      index(){
        return this.$store.state.index;
      },
    },
    created(){
      this.getinfo();
    },
    methods: {
      getinfo(){
        this.u_pic = window.localStorage.mImg;     // 1. 获取用户头像
        this.u_name = window.localStorage.mName;                           // 2. 获取用户昵称
        this.current_time = moment().format('YYYY年MM月DD日 HH:mm');       // 3. 格式化当前时间
      },
      changeImage(e) {
        this.images = e.target.files;
        console.log(this.images)
      },
      clear(){
        this.input_text = '';
      },
      send() {
        if(this.$store.state.index != 1){
          this.$message({
            showClose: true,
            message: '请先登录！',
            type: 'info'
          });
          this.$router.push({path: '/login'})
        }
        if(this.$store.state.index == 1){
          //发送内容
          if(this.input_text.trim() ==0 ){
            this.openErr()
          }
          const that = this;
          //发送表单数据
          var myFormData = new FormData();
          //依次添加多个文件
          for(var i = 0 ; i<= this.images.length ; i++){
            myFormData.append('filename', this.images[i]);
          }
          //添加其他的表单元素
          myFormData.append("u_pic",this.u_pic);
          myFormData.append("u_name",this.u_name);
          myFormData.append("current_time",this.current_time);
          myFormData.append("contentData",this.input_text);
          let config = { headers: { 'Content-Type': 'multipart/form-data'}};
          axios.post(this.$store.state.url + '/share/sendinfo', myFormData,config)
            .then(result =>{
              that.input_text = '';
              that.current_info= true;
              that.sendsuccess();
            });
        }
      },
      openErr() {                                             //提示用户输入不能为空
        this.$message({
          showClose: true,
          message: '输入不能为空!',
          type: 'error'
        });
      },
      infos() {
        if (this.input_text.length > 200) {
          this.input_text = this.input_text.substr(0, 200);
          this.info();
        }
      },

      info() {                                             //提示用户输入不能为空
        this.$message({
          showClose: true,
          message: '字数已达限制!',
          type: 'info'
        });
      },
      sendsuccess() {                                             //提示用户输入不能为空
        this.$message({
          showClose: true,
          message: '发布成功!',
          type: 'success'
        });
      },
    },

  }
</script>

<style scoped>
  .box{
    background: #e3e3e5;
    width: 100%;
    text-align: left;
    padding-bottom: 50px;
  }
  .send_temp{
    width: 900px;
    height: auto;
    margin: 0 auto;
    border-radius: 5px;
  }
  .send_temp h2{
    display: inline-block;
    font-family: '微软雅黑';
    font-size: 26px;
    font-style: italic;
    color: lightseagreen;
    margin: 0;
    padding-top: 10px;
  }
  .send_temp .title_info{
    display: inline-block;
    float: right;
    margin-top: 32px;
    color: lightseagreen;
    font-size: 12px;
    font-style: italic;
  }
  .send_temp .bg_img{
    width: 948PX;
    height: 200px;
    background: url("../../assets/images/bg.png") no-repeat center;
  }
  .send_temp .form{
    position: relative;
    margin: 25px 0 25px 0;
  }
  .send_temp .form .cover{
    display: block;
    width: 50px;
    height: 50px;
    /*background: lightseagreen;*/
    font-size: 50px;
    line-height: 50px;
  }
  .send_temp .form .files{
    display: block;
    position: absolute;
    bottom: 30px;
    left: 0;
    opacity: 0;
  }
  textarea{
    width: 400px;
    height: 100px;
    outline: none;
    border: 1px solid lightseagreen;
    border-radius: 5px;
    font-size: 14px;
    text-indent: 1em;
    color: rgba(0,0,0,.6);
    background: rgba(0,0,0,.1);
    resize:none;
  }
  ::-webkit-input-placeholder {
    color: rgba(0,0,0,.5);
    font-size: 13px;
    font-style: italic;
  }
  .files{
    display: inline-block;
    width: 50px;
    height: 50px;
  }
  .send_temp button{
    width: 80px;
    height: 30px;
    background: lightseagreen;
    border-radius: 5px;
    line-height: 30px;
    border: 1px solid dodgerblue;
    font-size: 14px;
    font-family: "微软雅黑";
    color: #eec;
    margin-left: 40px;
  }
  .send_temp .reset{
    margin-left: 200px;
  }
</style>
