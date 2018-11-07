<template>
  <div class="comment_content">
    <div>
      <h3>相关评论</h3>
      <hr>
      <input type="text" class='inputs el-icon-edit' readonly placeholder="发表评论" @click="show"
             data-toggle="modal" data-target="#myModal">
      <span class="open" @click="open" v-show="showAll">查看全部评论</span>
      <span class="nocomment" v-show="showno">暂无评论,快来成为第一个发言的人吧...</span>
      <transition name="el-zoom-in-top">
        <div class="comment_main" v-show="show2">
          <ul class="com_list">
            <li v-for="(commsg ,index) in comdata" :key="index">
              <div class="com_box">
                <div class="img_box"><img :src="commsg.user_pic" alt=""></div>
                <div class="word_box">
                  <span class ="user_name">{{commsg.user_name}}</span>
                  <span class ="time">{{commsg.com_time}}</span>
                  <span class="reply_btn" @click="show($event,commsg.com_id)">回复</span>
                  <p class="p_content">{{commsg.com_txt}}</p>
                </div>
              </div>
              <ul class="reply_list">
                <li v-for="replycom in commsg.replydata">
                  <div class="rep_box">
                    <div class="img_box"><img :src="replycom.user_pic" alt=""></div>
                    <div class="word_box">
                      <span class ="user_name">{{replycom.user_name}}</span>
                      <span class ="time">{{replycom.reply_time}}</span>
                      <span class="reply_btn" @click="show($event,commsg.com_id)">回复</span>
                      <p class="p_content">{{replycom.reply_txt}}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <!--弹出框-->
    <el-dialog :title='form.whichOne' :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item :label='form.label'>
          <el-input  v-model="form.comment" autocomplete="off" autofocus></el-input> <!--文本框输入内容-->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendMessage">发 送</el-button>
      </div>
    </el-dialog>
    <!--结束-->
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment';
    export default {
        name: "commentlist",
      data(){
          return {
            comdata:null,    //评论内容
            replydata:null,  //回复内容
            newReply:[],     //整理回复数据所需容器
            w_id: '',        //当前帖子的id(已得)
            comId: '',       //当前评论id;(已得)
            current_time: '',//当前时间
            dialogFormVisible: false,
            flag: false,
            isShow: false,
            l_userid:'',     //当前用户id(已得)
            u_name: '',      //当前用户名字(已得)
            u_pic: '',       //当前用户头像(已得)
            show2: false,    //控制评论组件显示隐藏
            showAll: false,  //打开评论按钮
            showno: true,    //提示无评论

            comment_msg: {
              w_id: '',      //文章id
              p_comment: '', //评论内容
              u_name: '',    //登陆用户向姓名
              u_pic: '',     //登陆用户的头像
              c_time: '',    //当前回复时间
            },
            reply_msg:{
              c_id: '',      //评论id
              r_content: '', //回复内容
              u_name: '',    //登陆用户的姓名
              u_pic: '',     //登陆用户的头像
              c_time: '',    //当前回复时间
            },
            form: {          //输入框数据
              whichOne: '',
              comment: '',
              label: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
            },
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
      created(){                                                //获取登陆用的id,姓名,和头像
        this.u_name = window.localStorage.mName;
        this.u_pic = window.localStorage.mImg;
        this.l_userid = window.localStorage.mId;

        this.w_id = this.$route.query.id;                       //获取当前帖子的id

        // console.log( obj.mName, obj.mImg ,obj.mId)
      },
      mounted(){
        this.getComment();
        this.getdate();
        setTimeout(()=>{

          if(this.comdata != null){
            this.showAll = true;
            this.showno = false;
          }

        },2000)
      },
      methods:{                                                 //控制评论显示隐藏
        open(){
          this.show2 = !this.show2;
        },
        getComment(){                                           //显示评论信息评论功能
          const that = this;
          this.d_id = this.$route.query.id;
          axios.get(`${that.$store.state.url}/share/Comment?id=${that.d_id}`).then(result=>{
            that.comdata = result.data.comments;                //保存评论数据
            that.replydata = result.data.replydata;             //保存回复数据

            for(let j = 0; j<that.replydata.length; j++){       //遍历回复数组 取出每个其中的对象.统一保存到新数组
              for (let i = 0; i<that.replydata[j].length; i++) {
                that.newReply.push(that.replydata[j][i])
              }
            }
            for(let i = 0; i<that.comdata.length; i++){
              that.comdata[i].replydata = [];                   //遍历所有评论,给每个添加reply数组;
              for (let j=0; j<that.newReply.length; j++){
                if( that.comdata[i].com_id == that.newReply[j].com_id ){
                  that.comdata[i].replydata.push(that.newReply[j])
                }
              }
            }

          }).catch(err=>{
            console.log(err)
          })
        },
        show(e,cur_comId){                                      //判断评论或者回复
            // console.log(e.target.placeholder);
            if(this.$store.state.index != 1){
              this.openLogin();
            }else{
              this.form.whichOne = e.target.innerHTML || e.target.placeholder;
              this.comId = cur_comId;                             //获取当前的评论id
              return this.dialogFormVisible=true;
            }
          },
        getdate(){
          this.current_time =  moment().format('YYYY年MM月DD日 HH:mm:s')
          console.log(this.current_time);
        },
        openErr() {                                             //提示用户输入不能为空
          this.$message({
            showClose: true,
            message: '输入不能为空',
            type: 'error'
          });
        },
        openLogin() {                                             //提示用户输入不能为空
          this.$message({
            showClose: true,
            message: '请先登录！',
            type: 'info'
          });
          this.$router.push({path: '/login'})
        },
        openComment() {
          this.$message({
            showClose: true,
            message: '评论成功',
            type: 'success'
          });
        },
        openreply() {
          this.$message({
            showClose: true,
            message: '回复成功',
            type: 'success'
          });
        },
        sendMessage(){
            const  that = this;
                                                                 //  先判断，交互数据,最后返回false关闭窗口
            if(this.trim(this.form.comment).length == 0){        //返回输入为空时提示
              setTimeout(()=>{
                this.openErr();
              },1000);
              return this.dialogFormVisible = false;
            }else{
              if (this.form.whichOne =='发表评论') {
                //显示title 整合数据调用发评论接口 传参:(用户的id, 文章的id, 评论内容,头像,姓名)
                this.comment_msg.w_id = this.w_id;               // 帖子id
                this.comment_msg.p_comment = this.form.comment;  //评论内容
                this.comment_msg.u_name = this.u_name;           //用户姓名
                this.comment_msg.u_pic = this.u_pic;             // 用户头像
                this.comment_msg.c_time = this.current_time;     // 发布时间
                axios.post(this.$store.state.url + '/share/send', {c_msg:that.comment_msg})
                  .then(result=>{
                    // console.log(result.data.data);
                  if (result.data.data == 1) {
                    that.getComment()
                    setTimeout(()=>{                             //提示评论成功
                      that.openComment();
                    },1000);
                  }
                })
                return this.dialogFormVisible = false;
              }else{                                            //回复title 搜集数据调用回复接口 传参(回复人id, 评论编号>id 文本内容,头像,姓名)

                this.reply_msg.c_id =  this.comId;              // 评论id
                this.reply_msg.r_content = this.form.comment;   //回复内容
                this.reply_msg.u_name = this.u_name;            //用户姓名
                this.reply_msg.u_pic = this.u_pic;              // 用户头像
                this.reply_msg.c_time = this.current_time;      // 回复时间
                axios.post(this.$store.state.url + '/share/reply',{r_msg:that.reply_msg}).then(result=>{
                  if (result.data.data ==1){
                    that.getComment()
                    setTimeout(()=>{                            //提示回复成功
                      that.openreply();
                    },1000);
                  }
                })

                return this.dialogFormVisible = false;
              }
            }

        },
       trim(str){
        return str.replace(/(^\s*)|(\s*$)/g, "");

        }
      },
    }
</script>

<style scoped>
  ul,li{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .comment_content {
    width: 70%;
    margin: 80px  auto;
    height: auto;
    text-align: left;
  }
  .comment_content h3 {
    margin: 10px 0 0 0;
    font-style: italic;
    font-family: '仿宋';
    font-size: 24px;
    font-weight: bold;
    line-height: normal;
  }
  .comment_content .inputs {
    outline: navajowhite;
    width: 460px;
    height: 35px;
    text-indent: 1em;
    border-radius: 5px;
    border: 1px skyblue solid;
    /*margin-left: 15px;*/
    font-style: italic;
    margin-bottom: 20px;
  }
  /*每条评论信息样式*/
  .comment_main {
    width: 900px;
    height: auto;
  }
  .comment_main li {
    width: 100%;
    height: auto;
  }
  .com_box,.rep_box {
    margin-top: 10px;
    overflow: hidden;
    background-color: rgba(225,167,72,.2);
  }
  .com_box,.rep_box {
    height: auto;
    border-radius: 3px;
  }
  .com_box .img_box,.rep_box .img_box {
    width: 70px;
    height: 70px;
    float: left;
  }
  .img_box img{
    width: 70px;
    height: 70px;
  }
  .com_box .word_box {
    width: 820px;
    height: auto;
    float: right;
  }
  .com_box .word_box,.rep_box .word_box {
    height: auto;
    float: right;
  }
  .com_box .user_name,.rep_box .user_name {
    display: inline-block;
    margin-left: 20px;
    width: auto;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    font-family: "幼圆";
    font-weight: bold;
  }
  .com_box .p_content {
    width: 620px;
    margin-top: 20px;
  }
  .com_box .p_content,.rep_box .p_content {
    padding: 5px;
    font-size: 14px;
    line-height: normal;
  }
  .com_box .time,.rep_box .time {
    display: inline-block;
    float: right;
    margin: 10px;
    font-size: 14px;
    line-height: unset;

  }
  .reply_btn {
    display: inline-block;
    font-size: 13px;
    color: #5f9ea0;
    margin: 10px 0 0 15px;
    cursor: pointer;
  }
  .rep_box {
    overflow: hidden;
    margin-left: 42px;
    background-color: #f5f5f5;               /*修改颜色*/
    margin-top: 8px;
  }
  .rep_box .word_box {
    width: 780px;

  }
  .rep_box .p_content {
    width: 580px;
    margin-top: 25px;
  }
  .nocomment,.open {
    display: inline-block;
    width: auto;
    background-color: lightgrey;
    border-radius: 2px;
    padding: 6px;
    font-size: 13px;
    font-weight: bold;
    color: #5f9ea0;
    font-family: '幼圆';
  }
  .open {
    margin-left: 40px;
    cursor: pointer;
  }
  .nocomment {
    display: block;
    text-align: center;
    background: transparent;
  }
</style>
