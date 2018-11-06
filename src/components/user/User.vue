<template>
  <div>
    <div class="container-fluid carousel1 rowB1 bg-1">
      <el-carousel :interval="4000" type="card" height="500px">
        <el-carousel-item v-for="item in imgList" :key="item.id">
          <img :src="item.idView" class="bannerImg" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="container-fluid">
      <div class="row rowH1">
        <h1>骑趣</h1>
        <p>你可以组合一台自行车，但组合不出骑单车的快乐，除非你骑上它。</p>
      </div>
      <div class="row rowH2 video1">
        <div class="col-xs-5 col-xs-offset-1">
          <!--../../assets/video/Q1.mp4  此视频太大，没有进行上传，可以自己添加视频-->
          <video src="" controls muted></video>
        </div>
        <div class="col-xs-5 bg-2">
          <p class="text text-left pStyle">
            <span class="line line-top"></span>
            <span class="line line-right"></span>
            <span class="line line-bottom"></span>
            <span class="line line-left"></span>
            一套春秋季黑红相间的骑行服，黑色骑行头盔，淡红色偏光太阳镜，红白相间骑行手套。
            左耳一个蓝牙耳机，通过手机播放着“神秘园”音乐。以均速每小时20公里的速度向前……你可能安静的欣赏过音乐，甚至慵懒的窝在沙发里。
            但你绝对没有在快速前行的自行车上欣赏音乐的经历。一首“神秘园”，恬静深远、自然流畅、舒缓柔美、充满了思忆与忧郁。
            空灵的曲风缓缓的像流水流过全身。随着热气在周身升腾，在运动中身体被一种难以形容的力量慢慢贯通，舒适的没有任何疲劳的感觉。这就是骑行的过程。
            而真正使我快乐的，是一路上的“思维静止”。当你用心欣赏音乐，你不会用大脑分析、判断每一个音符的对错、好坏和成败。
            你的心会跟随着乐曲进入音乐所带给你的空灵世界——那一曲曲“神秘园”，令我神往。而思维的停止，大脑不再叽叽喳喳，东想西想，使身心获得极大的安慰！
            甚至消除了疲劳。当路况或其他原因，使你从音乐中走出来，你放眼望去，满世界都是喜悦、美好和爱。我看到凌乱的玉米地，是大自然奉献后的笑脸；
            我看到绿油油的麦田，是大自然来年奉献的希望；我看到阳光下的经年水槽，是奉献后的坦然，像一个老人，微笑着站在路边……这个世界就是奉献的世界，
            只有奉献我们才心安，才坦然，才会有欢笑的脸……就这样，在热汗淋漓的骑行中，身体以及心灵得到愉悦，这，就是骑行的快乐！</p>
        </div>
      </div>
      <div class="row rowH2 rowH3 bg-1 rowH4">
        <div class="col-xs-10 col-xs-offset-1">
          <div class="row">
            <div class="col-xs-12 col-lg-7 newBox">
              <h3 class="text-left">骑趣推荐</h3>
              <div class="content" v-for="(recommendinfo,index) in recommends" v-if="index<data1">
                <figure @click="torecommenddetails(recommendinfo.zId)">
                  <div class="img-box">
                    <img :src="recommendinfo.zImg" alt="">
                    <div class="text-desc">
                      <p>{{recommendinfo.zContent}}</p>
                    </div>
                  </div>
                  <figcaption>
                    <p class="centertitle">{{recommendinfo.zTitle}}</p>
                    <p class="detail">
                      <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                      {{recommendinfo.zTime.substring(0,10)}}</p>
                  </figcaption>
                </figure>
              </div>
            </div>
            <div class="col-xs-12 col-lg-5">
              <div class="row">
                <h3 class="text-center">热点资讯</h3>
                <div class="content content col-xs-12 rowH2 Q1" v-for="(hotinfo,index) in hotinfos" v-if="index<data">
                  <figure @click="tohotdetails(hotinfo.zId)">
                    <div class="img-box1">
                      <img :src="hotinfo.zImg" alt="">
                      <div class="text-desc">
                        <p>{{hotinfo.zContent}}</p>
                      </div>
                    </div>
                    <figcaption>
                      <p class="centertitle">{{hotinfo.zTitle}}</p>
                      <p class="detail">
                        <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                        {{hotinfo.zTime.substring(0,10)}}</p>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row rowH2 rowH3">
        <div class="col-xs-10 col-xs-offset-1">
          <div class="row Q2">
            <h2 class="text-center">骑行赛事</h2>
            <div class="content col-xs-12 col-md-6 col-lg-4 rowH2 Q3" v-for="(game,index) in games" v-if="index<data2">
              <figure @click="togamedetails(game.zId)">
                <div class="img-box3">
                  <img :src="game.zImg" alt="">
                </div>
                <figcaption>
                  <p class="centertitle pStyle1 rowH2">{{game.zTitle}}</p>
                  <p  class="detail rowH2 pStyle2">{{game.zContent}}</p>
                  <p class="detail">
                    <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                    {{game.zTime.substring(0,10)}}</p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
      <div class="row rowH2 rowB2 bg-1">
        <div class="col-xs-10 col-xs-offset-1">
          <div class="row">
            <h2 class="text-center">骑行攻略</h2>
            <div class="content col-xs-12 col-md-6 col-lg-3 rowH2 Q2" v-for="(strway,index) in strways" v-if="index<data2">
              <figure @click="towaydetails(strway.sId)">
                <div class="img">
                  <img :src="strway.sImg" alt="">
                </div>
                <figcaption>
                  <p class="centertitle rowH2">{{strway.sTitle}}</p>
                  <!--<p  class="detail rowH2">{{strway.sIntro}}</p>-->
                  <p class="detail">
                    <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                    {{strway.sTime.substring(0,10)}}</p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
    <goTop></goTop>
    <app-foot></app-foot>
  </div>
</template>

<script>
  import goTop from '../share/gotop.vue'
  import Foot from '../Foot.vue'
  import axios from 'axios'
  export default {
    name: "User",
    data(){
      return {
        imgList: [
          {id: 0, idView: require('../../assets/images/t1.png')},
          {id: 1, name: '详情', idView: require('../../assets/images/t2.png')},
          {id: 2, name: '推荐', idView: require('../../assets/images/t3.png')},
          {id: 3, name: '推荐', idView: require('../../assets/images/t4.png')},
        ],
        data:3,
        data1:1,
        data2:8,
        hotinfos:[],
        recommends:[],
        newsinfos:[],
        strways:[],
        games:[],
      }
    },
    components:{
      goTop,
      'app-foot':Foot,
    },
    computed:{
      url(){
        return this.$store.state.url;
      }
    },
    mounted() {
      let _this = this;
      axios.get(this.$store.state.url + '/information/recommend')
        .then(function (result) {
          let info = eval("(" + result.request.response + ")");
          _this.recommends = info.data[0];
        }, function (err) {
          console.log(err.message)
        })
      axios.get(this.$store.state.url + '/information/hot')
        .then(function (result) {
          let info = eval("(" + result.request.response + ")");
          _this.hotinfos = info.data[0];
        }, function (err) {
          console.log(err.message)
        })
      axios.get(this.$store.state.url + '/strategy/way')
        .then(function (result) {
          let info = eval("(" + result.request.response + ")");
          _this.strways = info.data[0];
        }, function (err) {
          console.log(err.message)
        })
      axios.get(this.$store.state.url + '/information/game')
        .then(function (result) {
          let info = eval("(" + result.request.response + ")");
          _this.games = info.data[0];
        }, function (err) {
          console.log(err.message)
        })
    },
    methods: {
      torecommenddetails(index){
        this.$router.push(`/information/${index}`)
      },
      tohotdetails(index){
        this.$router.push(`/information/${index}`)
      },
      towaydetails(index){
        this.$router.push(`/strategy/${index}`)
      },
      togamedetails(index){
        this.$router.push(`/information/${index}`)
      },
    }
  }
</script>

<style scoped>
  .carousel1{padding: 0;}
  .bg-1{background-color: rgb(237,237,238);}
  .bg-2{margin-top: 1%;}
  .bg-2:hover{border:2px dashed pink;border-radius:10px;}
  .rowH1{margin-top: 10px;}
  .rowH2{margin-top: 20px;}
  .rowH3{margin-bottom: 20px;}
  .rowB1{padding-top: 20px;}
  .rowB2{padding-bottom: 20px;}
  .bannerImg{
    height: 500px;
  }
  .text{text-indent: 2em;line-height: 25px;letter-spacing: 3px;margin-top: 10px;}
  .video1{
    /*height: 450px;*/
  }
  .video1 video{
    width:100%;
    height: 430px;
  }
  .newBox figure{
    text-align: center;
    margin-top: 20%;
  }
  .newBox .img-box{
    width: 85%;
    height: 401px;
    border-radius:10px;
    margin-left: 10%;
    padding: 0;
    transition: 0.5s;
  }
  .newBox .img-box img{
    width: 100%;
    height: 100%;
    border-radius:10px;
    /*margin-left: 5%;*/
  }
  .newBox:hover .img-box img{transform: scale(0.6) translateY(-30%); position: relative; z-index: 9;}
  .newBox .img-box .text-desc{transform: translateY(100%); opacity: 0; padding: 85px 20px 10px; transition: 0.5s;cursor: default;}
  .newBox:hover .img-box .text-desc{transform: translateY(-100%); opacity: 1;}
  .newBox figcaption{
    text-align: center;
    margin-top: 5%;
    margin-left: 5%;
  }
  .newBox .detail{
    text-align: center;
    margin-top: 5%;
    cursor: pointer;
  }
  .Q1 .img-box1{
    width: 300px;
    height: 160px;
    border-radius:10px;
    margin: 0 auto;
  }
  .Q1 .img-box1 img{
    width: 300px;
    height: 160px;
    border-radius:10px;
  }
  .Q1:hover .img-box1 img{transform: scale(0.6) translateY(-35%); position: relative; z-index: 9;}
  .Q1 .img-box1 .text-desc{transform: translateY(100%); opacity: 0; padding: 85px 20px 10px; transition: 0.5s;cursor: default;}
  .Q1:hover .img-box1 .text-desc{transform: translateY(-90%); opacity: 1;}
  .Q1 p{font-size: 14px;font-weight: normal;}
  .Q1 figure{height: 234px;}
  .Q2{margin-top: 20px;margin-bottom: 20px;}
  .Q2 .img{
    width: 90%;
    height: 65%;
    border-radius:5px;
    overflow: hidden;
    margin: 0 auto;
  }
  .Q2 .img img{
    width: 100%;
    height: 100%;
    border-radius:5px;
    transition: all 0.5s ease 0s;
  }
  .Q2:hover .img img{ transform: scale(1.2); }
  .Q2 p{font-size: 14px;font-weight: normal;}
  .Q2>figure{height: 280px;padding-top: 20px;}
  .Q2>figure:hover{box-shadow: 0 0 10px rgba(0,0,0,0.3);}
  .Q3{height: 400px;}
  .Q3 .img-box3{
    width: 320px;
    height:220px;
    border: 10px solid #eee;
    transition:all .4s ease-in-out;
    border-radius:50%;
    margin: 0 auto;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
  }
  .Q3:hover .img-box3{
    border-radius: 0;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
    transition:all .4s ease-in-out;
  }
  .Q3 .img-box3 img{
    width: 100%;
    height:100%;
  }
  .Q3 .pStyle1{font-size: 14px;font-weight: bold;cursor: pointer;}
  .pStyle2{text-indent: 2em;width: 80%;text-align: left;margin-left: 12%;cursor: default;}
  .infoBox figcaption{
    width: 60%;
    text-align: left;
    float:right;
    position: absolute;
    right:0;
  }
  .Q1 .centertitle{margin-top: 3%;}
  .centertitle{
    cursor: pointer;
  }
  .centertitle:hover{
    color:red;
  }
  .infoBox .detail{
    cursor: pointer;
    margin-top: 10%;
  }
  h2,h3{color: gray;}
  .infoBox h3{margin-bottom: 5%;}
  .pStyle{position: relative;}
  .pStyle:hover{
    background-position:100% center;}
  .pStyle .line{
    position:absolute;
    background:none;
    transition:ease 1s;
  }
  .pStyle:hover .line{background: pink;}
  .pStyle .line-top{
    width:0;
    height:2px;
    left:0;
    top:-2px;}
  .pStyle:hover .line-top{width:100%;left: 0;}
  .pStyle .line-right{
    width:2px;
    height:0;
    right:-2px;
    top:0;}
  .pStyle:hover .line-right{height:100%;top: 0;}
  .pStyle .line-bottom{
    width:2px;
    height:0;
    left:-2px;
    bottom:0;}
  .pStyle:hover .line-bottom{height:100%;bottom: 0;}
  .pStyle .line-left{width:0;
    height:2px;
    right:0;
    bottom:-2px;}
  .pStyle:hover .line-left{width:100%;right: 0;}
  @media(max-width: 768px) {
    .video1{display: none;}
  }
  @media(min-width: 768px){
    .video1{display: none;}
    .infoBox figure{
      height: 150px;
      text-align: center;
      position: relative;
    }
    .infoBox img{
      width: 42%;
      height: 90%;
      border-radius:10px;
      float:left;
      position:absolute;
      left:0;
    }
  }
  @media(min-width: 992px){
    .video1{display: none;}
  }
  @media(max-width: 1200px){
    .newBox h3{text-align: center;}
    .newBox figure{
      text-align: center;
      margin-top: 5%;
    }
    .newBox img{
      margin-left: 0;
    }
    .newBox figcaption{
      margin-left: 0;
    }
  }
  @media(min-width: 1200px){
    .video1{display: block;}
    .rowH4{height: 860px;}
  }
</style>

