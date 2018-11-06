<template>
  <div>
    <div class="box" >
      <breadcrumb></breadcrumb>
      <div class="top">
        <div class="top_wrap">

          <transition name="el-zoom-in-center">
            <h1 class="h_title" v-show="show1">骑 行</h1>
          </transition>

          <transition name="el-zoom-in-center">
            <p class="h_p" v-show="show1">骑行就是骑着车子，从一个地方到另一个地方的旅行。是一种健康自然的运动旅游方式，能充分享受旅行过程之美。一辆单车，一个背包即可出行，简单又环保。也可分为短途和长途。</p>
          </transition>

        </div>
      </div>
      <transition name="el-zoom-in-center">
        <div class="content" v-show="show1"  v-for="data in infos">
          <div class="img_box">
            <div class="img_wrap">
              <img :src="data.security_img" class="img" alt="">
              <h1 class="font">{{data.security_title}}</h1>
              <div class="eclipse_box"></div>
            </div>
          </div>
          <pre class="pre">{{tex}}</pre>
        </div>
      </transition>
      <comlist v-show="show1"></comlist>
      <goTop></goTop>
    </div>
    <app-foot></app-foot>
  </div>
</template>

<script>
  import axios from 'axios'
  import Foot from '../Foot'
  import comlist from './commentlist';
  import goTop from './gotop';
  import breadcrumb from './bread'
  export default {
    name: "details",
    data() {
      return {
        d_id:'',
        infos:'',
        fullscreenLoading: false,
        show1:false,
        x: 1,
        y: 0,
        timer: null,
        timer1:null,
        tex:'',
        textArr:'',
      }
    },
    components:{
      goTop,
      comlist,
      breadcrumb,
      "app-foot":Foot,
    },
    computed:{
      url(){
        return this.$store.state.url;
      }
    },
    created(){
    },
    mounted(){
      setTimeout(()=>{
        this.show1 = true;
      },2000)
      // this.getComment();
      const that = this;
      this.d_id = this.$route.query.id;
      axios.get(`${that.$store.state.url}/share/details?t_id=${that.d_id}`).then(result=>{
        // console.log(result.data.data)
        this.infos = result.data.data;
        this.textArr = (result.data.data[0].security_content);
      }).catch(err=>{
        console.log(err)
      });
      this.openFullScreen();
      this.showtext();
    },
    methods:{
      openFullScreen() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.9)'
        });
        setTimeout(() => {
          loading.close();
        }, 1500);
      },
      showtext(){
        const that = this;
        clearInterval(that.timer);
        that.timer = setInterval(()=>{
          that.tex = that.textArr.substring(0,that.x);
          // console.log(that.tex)
          that.x++;
          if (that.tex.length == that.textArr.length){
            that.x = 0;
            clearInterval(that.timer);
          }
        },70);
      },
    }
  }
</script>

<style scoped>
  .top {
    width: 70%;
    height: 140px;
    margin: 0 auto;
    background: url("../../assets/images/zbtopbg.jpg") repeat center;
    color: white;
  }
  .top .top_wrap {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
  }
  .top .top_wrap h1 {
    display: inline-block;
    width: 350px;
    font-size: 30px;
    text-align: center;
    position: relative;
    top: -40px;
  }
  .top .top_wrap p {
    width: 600px;
    height: 140px;
    line-height: 3em;
    display: inline-block;
    font-size: 16px;
    font-style:italic;
  }
  .content {
    width: 70%;
    height: auto;
    margin: 10px auto;
    text-align: center;
    background: white;
    position: relative;
    border-radius: 15px;
  }
  .img_box {
    width: 100%;
    height: 410px;
    /*background: red;*/
  }
  .img_wrap {
    width: 1065px;
    height: 400px;
    position: absolute;
    /*left: 3%;*/
    overflow: hidden;
  }
  .img_box .img_wrap .img {
    width: 1065px;
    height: 400px;
  }
  .content h1 {
    line-height: normal;
    font-size: 36px;
    color:  #D00000;
    position: absolute;
    top: 60%;
    left: 55%;
  }
  .eclipse_box {
    width: 1065px;
    height: 400px;
    background-color: rgba(0,0,0,.4);
    border-radius: 15px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .eclipse_box:hover {
    background-color: rgba(0,0,0,0);
    transition: all 2s;
  }
  .img_box:hover .img {
    transform: scale(1.2,1.2);
    transition: 2s;
  }
  .content .img {
    font-size: 0;
    border-radius: 15px;
  }
  .content pre {
    padding: 10px;
    line-height: 3em;
    text-align: left;
    font-family: '微软雅黑';
    font-size: 16px;
    text-indent: 4em;
    border-radius: 15px;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
</style>
