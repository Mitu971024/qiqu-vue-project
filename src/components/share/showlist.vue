<template>
  <div class="wrap">
    <div id="box">
      <ul>
        <li v-for="(self,index) in allData" :key="index" class="card_list">
          <div class="cardinfo">
            <img class="user_pic" :src='`${HImg}` + self.user_pic'/>
            <span class="user_name">{{self.user_name}}</span>
            <span class="c_time">发布于{{self.card_time}}</span>
            <p class="txt_content">{{self.card_content}}</p>
          </div>
          <ul class="img_all">
            <li v-for="img in self.card_img.split(',')" class="img_list">
              <img :src='`${HImg}/uploadfiles/`+img' alt="图片" @click="showbig(img)" class="img-responsive"/>
              <div class="inner"></div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <button class="btn btn-lg">已经到底了</button>
      <div class="shadow" @click="hidebig">
        <img :src='`${HImg}/uploadfiles/` + current_url' alt="">
      </div>
      <go-top v-if="flag"></go-top>
  </div>
</template>

<script>
  import axios from 'axios';
  import goTop from './gotop'
  export default {
    name: "showlist",
    props:["current_info"],
    data(){
      return{
        allData: null,
        current_url: null,
        HImg:'',
        flag:true,
      }
    },
    components:{
      goTop
    },
    computed:{
      url(){
        return this.$store.state.url;
      }
    },
    watch:{
      "current_info"(value){
        if (value) {
          this.getImg();
          return;
        }
      },
    },
    created(){
      this.getImg();
      // this.allData.unshift(this.current_info);  //接收父组件的数据放进数组中
    },
    mounted(){
      this.HImg = this.$store.state.url;
      $(function () {
        $("#box .img_list").hover(function(){
          $(this).siblings().stop().fadeTo(500,0.5);
        },function(e){
          $("#box .img_list").stop().fadeTo(500,1);
        });
      })


    },
    methods:{
      getImg(){
        const that = this;
        axios.get(that.$store.state.url + '/share/allcard').then(result=>{
          that.allData = result.data.data;
          // console.log(that.allData)
        }).catch(err=>{
          console.log(err)
        })
      },
      showbig(url){
        this.current_url = url;
        $(".shadow").css({"top":$(window).scrollTop()+'px',"opacity":"1","z-index":"1",});
        $('html').css('overflow','hidden'); //禁止滚动条
        this.flag = false;
      },
      hidebig(){
        $('.shadow').css({"top":$(window).scrollTop()+'px',"opacity":"0","z-index":"-1"});
        $('html').css('overflow','auto'); //开启滚动
        this.flag = true;
      },
      showcoll(){
        $(function () {
          $('card_list').slideToggle(800);
        })
      }
    },
  }
</script>

<style scoped>
  *{
    list-style: none;
  }
  .wrap{
    width: 100%;
    height: auto;
    text-align: left;
  }
  #box{
    width: 980px;
    height: auto;
    margin: 0 auto;
    overflow: hidden;
  }
  #box .card_list{
    margin-bottom: 5px;
    background: white;
  }
  #box .cardinfo {
    background: #EEEEEE;
  }
  #box .cardinfo .user_pic{
    display: inline-block;
    width: 50px;
    height: 50px;
    margin: 5px;
    border-radius: 50%;
  }
  #box .cardinfo .user_name{
    display: inline-block;
    width: auto;
    /*background: lightcoral;*/
    font-size: 16px;
    font-weight: bold;
    font-family: "幼圆";
    padding: 5px;
    margin-left: 15px;
  }
  #box .cardinfo .c_time{
    display: inline-block;
    margin-left: 15px;
    font-size: 13px;
  }
  #box .cardinfo .txt_content{
    height: auto;
    padding: 20px;
    font-size: 14px;
    font-family: "微软雅黑";
    line-height: 1.5em;
    text-indent: 2em;
    background: white;
    color: rgba(50,85,60,0.9);
  }
  #box .img_all{
    width: 98%;
    height: auto;
    overflow: hidden;
    margin: 0 auto;
  }
  #box .img_list{
    width: 200px;
    height: 200px;
    float: left;
    margin: 5px;
    overflow: hidden;
    box-shadow: 0 0 14px olivedrab;
    position: relative;
  }
  #box .img_list img{
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;

  }
  #box .img_list img:hover{
    transform: scale(1.2);
    transition: all 1s;
  }
  #box .img_list .inner{
    width: 1px;
    height: 200px;
    position: absolute;
    top: 0;
    left: -150px;
    box-shadow: 60px 60px 60px 60px rgba(255,255,255,.2);
    transform:  skew(-25deg) ;
  }
  #box .img_list:hover .inner{
    animation: move 2s linear;
  }
  @keyframes move {

    form{
      transform: translate(0);
    }
    to{
      transform: skew(-45deg) translate(800px);
    }
  }
  .btn {
    display: block;
    margin: 15px auto 0;
    background-color: olivedrab;
    color: aliceblue;
  }
  /*遮罩层样式*/
  .shadow{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.7);
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 1s;
  }
  .shadow img{
    display: block;
    max-width: 1000px;
    max-height: 800px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
</style>
