<template>
  <div>
    <div class="row">
      <div class="top">
        <router-link tag="div" class="topleft img-inner-shadow" to="/strategy/20">
          <div class="topcontent">
            <span class="mask"></span>
            <span class="Span">火山湖上的绝美秋色 吉林龙湾群4+2游记</span>
          </div>
          <div class="layer"></div>
        </router-link>
        <router-link tag="div" class="topright img-inner-shadow" to="/strategy/21">
          <div class="topcontent">
            <span class="mask"></span>
            <span class="Span">敬畏自然 公路车穿越“蜀山之王”贡嘎雪山</span>
          </div>
          <div class="layer"></div>
        </router-link>
      </div>

      <div class="centerleft col-sm-8">
        <div class="h2title">
          <h2 class="title col-sm-3">路线攻略</h2>
          <hr class="col-sm-9">
          <div class="moreinfo" @click="showwayinfo">
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
            <span>更多</span>
          </div>
        </div>
        <div v-for="(strway,index) in strways" v-if="index<data">
          <figure class="strway" @click="towaydetails(strway.sId)" >
            <img :src="strway.sImg" alt="">
            <figcaption>
              <article>
                <header>
                  <hgroup>
                    <h4 class="centertitle">{{strway.sTitle}}</h4>
                    <p  class="detail">{{strway.sIntro}}</p>
                  </hgroup>
                </header>
                <div>
                  <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                  <span>{{strway.sTime.substring(0,10)}}&nbsp;&nbsp;</span>
                  <span>{{strway.sFrom}}</span>
                </div>
              </article>
            </figcaption>
            <hr class="hr">
          </figure>
        </div>

      </div>

      <div class="sidebar col-sm-4">
        <div class="sidebox">
          <div class="h2title">
            <h2 class="title col-sm-6">骑行课堂</h2>
            <hr class="col-sm-6">
            <div class="moreinfo" @click="showclassinfo">
              <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
              <span>更多</span>
            </div>
          </div>
          <div class="content"  v-for="(classstr,index) in classes" v-if="index<data">
            <figure  @click="toclassdetails(classstr.sId)">
              <img :src="classstr.sImg" alt="">
              <figcaption>
                <p   class="centertitle">{{classstr.sTitle}}</p>
                <p   class="detail">
                  <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                  {{classstr.sTime.substring(0,10)}}</p>
              </figcaption>
            </figure>
          </div>

        </div>
        <div class="sidebox">
          <div class="h2title" @click="showrecinfo">
            <h2 class="title col-sm-6">推荐文章</h2>
            <hr class="col-sm-6">
            <div class="moreinfo">
              <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
              <span>更多</span>
            </div>
          </div>
          <div class="content" v-for="(recommend,index) in recommends" v-if="index<data">
            <figure @click="torecdetails(recommend.sId)" >
              <img :src="recommend.sImg" alt="">
              <figcaption>
                <p  class="centertitle">{{recommend.sTitle}}</p>
                <p  class="detail">
                  <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                  {{recommend.sTime.substring(0,10)}}</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "strStart",
    data:function(){
      return {
        data:5,
        strways:[],
        classes:[],
        recommends:[]
      }
    },
    computed:{
      url(){
        return this.$store.state.url;
      }
    },
    mounted(){
      let _this=this;
      axios.get(this.$store.state.url + '/strategy/way')
        .then(function (result) {
          let info = eval("(" + result.request.response + ")");
          _this.strways = info.data[0];
        }, function (err) {
          console.log(err.message)
        })
      axios.get(this.$store.state.url + '/strategy/class')
        .then(function (result) {
          let info = eval("(" + result.request.response + ")");
          _this.classes = info.data[0].slice(0,3);
        }, function (err) {
          console.log(err.message)
        })
      axios.get(this.$store.state.url + '/strategy/recommend')
        .then(function (result) {
          let info = eval("(" + result.request.response + ")");
          _this.recommends = info.data[0].slice(0,3);
        }, function (err) {
          console.log(err.message)
        })
    },
    methods:{
      showwayinfo(){
        // this.data+=3;
        this.$router.push('/strategy/totalwaystr')
      },
      towaydetails(index){
        this.$router.push(`/strategy/${index}`)
      },
      showclassinfo(){
        this.$router.push('/strategy/totalclassstr')
      },
      toclassdetails(index){
        this.$router.push(`/strategy/${index}`)
      },
      showrecinfo(){
        this.$router.push('/strategy/totalrecstr')
      },
      torecdetails(index){
        this.$router.push(`/strategy/${index}`)
      }
    },

  }
</script>

<style scoped>
  .detail{
    cursor: pointer;
  }
  .topleft{
    width: 49%;
    height: 329px;
    border: 10px solid #f5f5f5;
    background-image: url("../../assets/images/strleft1.jpg");
    display: block;
    float: left;
    position:relative;
    cursor: pointer;
  }
  .topleft:hover,.topright:hover{
    box-shadow: 2px 2px 10px 3px #ccc;
    opacity: 0.9;
  }
  .img-inner-shadow .layer {position:absolute;top:0;right:0;bottom:0;left:0;transition:all 0.6s ease-in-out;}
  .img-inner-shadow:hover .layer {box-shadow:inset 0 0 120px rgba(255, 255, 255, 0.6);transition:all 0.6s ease-in-out;}
  .topright{
    width: 49%;
    height: 329px;
    border: 10px solid #f5f5f5;
    background-image: url("../../assets/images/strright1.jpg");
    display: block;
    float: right;
    position:relative;
    cursor: pointer;
  }
  .topcontent{
    width: 100%;
    height: 50px;
    text-align: center;
    font-size: 24px;
    background-color: black;
    cursor: pointer;
    color:#eee;
    opacity: 0.6;
    position:absolute;
    bottom:0;
  }
  .centerleft{
    float: left;
  }
  .h2title{
    width: 100%;
    display: inline-block;
    position:relative;
  }
  .h2title .title{
    float: left;
  }
  .h2title hr{
    height:4px;
    background-color:#ccc;
    position:absolute;
    bottom:0;
    right:0;
  }
  .centerleft .strway{
    height: 170px;
    border-radius: 10px;
    position:relative;
  }
  .centerleft .strway img{
    position:absolute;
    left:10px;
    top:25px;
  }
  .centerleft .strway figcaption{
    text-align: left;
    width:65%;
    float: right;
    display: inline-block;
    margin:25px auto;
  }
  .centerleft figure .hr{
    width: 100%;
    height:2px;
    background-color:#bbb;
    position:absolute;
    bottom:-25px;
  }
  .centertitle{
    font-weight: bolder;
    cursor: pointer;
  }
  .centertitle:hover{
    color:red;
  }
  .sidebar{
    float: right;
  }
  .sidebar .sidebox{
    width: 100%;
    position:relative;
  }
  .sidebar .sidebox figure{
    height: 120px;
  }
  .sidebar .sidebox img{
    width: 120px;
    height: 75px;
    float:left;
  }
  .sidebar .sidebox figcaption{
    text-align: left;
    width: 60%;
    float:right;

  }
  .moreinfo{
    width: 50px;
    height: 20px;
    opacity: 0.8;
    position:absolute;
    right:0;
    bottom:20px;
    cursor: pointer;
  }
  .centerleft h2,.sidebar h2{
    text-align: left;
  }
</style>
