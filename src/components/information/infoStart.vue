<template>
  <div class="rowB1">
    <div class="row">
      <div class="top" v-for="(recommendinfo,index) in recommends" v-if="index<data1">
        <div class="toptitle">骑趣推荐</div>
        <div class="imagechange-3d img-1 hover">
          <div class="imagechange-3d-inner">
            <div class="imgchange-1">
              <img :src="recommendinfo.zImg">
            </div>
            <div class="imgchange-2">
              <img src="../../assets/images/infotop.jpg">
            </div>
          </div>
        </div>
        <div class="topcontent">
          <p class="detail" @click="torecommenddetails(recommendinfo.zId)">{{recommendinfo.zTitle}}</p>
        </div>

      </div>

      <div class="centerleft col-sm-8">
        <div class="h2title">
          <h2 class="title col-sm-3">热门资讯</h2>
          <hr class="col-sm-9">
          <div class="moreinfo" @click="showhotinfo">
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
            <span>更多</span>
          </div>
        </div>

        <div  class="hotinfo" v-for="(hotinfo,index) in hotinfos" v-if="index<hotdata">
          <figure @click="tohotdetails(hotinfo.zId)" >

            <img :src="hotinfo.zImg" alt="">

            <figcaption>
              <article>
                <header>
                  <hgroup>
                    <h4   class="centertitle">{{hotinfo.zTitle}}</h4>
                    <p   class="detail">{{hotinfo.zContent}}</p>
                  </hgroup>
                </header>
                <div>
                  <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                  <span>{{hotinfo.zTime.substring(0,10)}}</span>
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
            <h2 class="title col-sm-6">今日资讯</h2>
            <hr class="col-sm-6">
            <div class="moreinfo" @click="showtodayinfo">
              <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
              <span>更多</span>
            </div>
          </div>
          <div class="content" v-for="(todayinfo,index) in todayinfos" v-if="index<data">
            <figure @click="totodaydetails(todayinfo.zId)">
              <img :src="todayinfo.zImg" alt="">
              <figcaption>
                <p  class="centertitle">{{todayinfo.zTitle}}</p>

                <p class="detail">
                  <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                  {{todayinfo.zTime.substring(0,10)}}</p>

              </figcaption>
            </figure>
          </div>
        </div>
        <div class="sidebox">
          <div class="h2title">
            <h2 class="title col-sm-4">骑闻</h2>
            <hr class="col-sm-8">
            <div class="moreinfo" @click="shownewinfo">
              <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
              <span>更多</span>
            </div>
          </div>
          <div class="content" v-for="(newinfo,index) in newsinfos" v-if="index<data">
            <figure @click="tonewdetails(newinfo.zId)">
              <img :src="newinfo.zImg" alt="">
              <figcaption>
                <p   class="centertitle">{{newinfo.zTitle}}</p>
                <p    class="detail">
                  <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                  {{newinfo.zTime.substring(0,10)}}</p>
              </figcaption>
            </figure>
          </div>
        </div>
        <div class="sidebox">
          <div class="h2title">
            <h2 class="title col-sm-4">其它</h2>
            <hr class="col-sm-8">
            <div class="moreinfo" @click="showotherinfo">
              <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
              <span>更多</span>
            </div>
          </div>
          <div class="content" v-for="(otherinfo,index) in otherinfos" v-if="index<data">
            <figure @click="tootherdetails(otherinfo.zId)" >
              <img :src="otherinfo.zImg" alt="">
              <figcaption>
                <p  class="centertitle">{{otherinfo.zTitle}}</p>
                <p   class="detail">
                  <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                  {{otherinfo.zTime.substring(0,10)}}</p>
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
    name: "infoStart",
    data(){
      return {
        hotdata:8,
        data:3,
        data1:1,
        hotinfos:[],
        todayinfos:[],
        newsinfos:[],
        otherinfos:[],
        recommends:[],
      }
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
      axios.get(this.$store.state.url + '/information/today')
        .then(function (result) {
          let info = eval("(" + result.request.response + ")");
          _this.todayinfos = info.data[0];
        }, function (err) {
          console.log(err.message)
        })
      axios.get(this.$store.state.url + '/information/news')
        .then(function (result) {
          let info = eval("(" + result.request.response + ")");
          _this.newsinfos = info.data[0];
        }, function (err) {
          console.log(err.message)
        })
      axios.get(this.$store.state.url + '/information/other')
        .then(function (result) {
          let info = eval("(" + result.request.response + ")");
          _this.otherinfos = info.data[0];
        }, function (err) {
          console.log(err.message)
        })
    },
    methods:{
      torecommenddetails(index){
        this.$router.push(`/information/${index}`)
      },
      showhotinfo(){
        this.$router.push('/information/totalhotinfo')
      },
      tohotdetails(index){
        this.$router.push(`/information/${index}`)
      },
      showtodayinfo(){
        this.$router.push('/information/totaltodayinfo')
      },
      totodaydetails(index){
        this.$router.push(`/information/${index}`)
      },
      shownewinfo(){
        this.$router.push('/information/totalnewinfo')
      },
      tonewdetails(index){
        this.$router.push(`/information/${index}`)
      },
      showotherinfo(){
        this.$router.push('/information/totalotherinfo')
      },
      tootherdetails(index){
        this.$router.push(`/information/${index}`)
      }
    },

  }

</script>

<style scoped>
  .rowB1{padding-top: 20px;}
  .top{
    width: 100%;
    height:660px;
    padding-top: 30px;
    background-color: rgba(250,165,145,0.2);
    border-radius: 10px;
    text-align: center;
    position:relative;
  }
  .top .toptitle{
    width: 20px;
    height: 100px;
    font-size:24px;
    color:#aaa;
    position:absolute;
    left: 50px;
    top:50px;
  }
  .top .img-1 {
    position:relative;
    width: 70%;
    height:500px;
    margin:10px auto;
    display:inline-block;
    overflow:hidden;
    background:#fff;
    border:10px solid #fff;
    box-shadow:0 2px 3px rgba(0, 0, 0, 0.3);
  }
  .top .img-1 img {
    width: 100%;
    height: 100%;
  }
  .imagechange-3d-inner {position:absolute;top:0;right:0;bottom:0;left:0}
  .imagechange-3d .imgchange-1 {opacity:1}
  .imagechange-3d:hover .imgchange-1 {opacity:0}
  .imagechange-3d .imgchange-2 {opacity:0}
  .imagechange-3d:hover .imgchange-2 {opacity:1}
  .imgchange-1 {position:absolute;top:0;right:0;bottom:0;left:0}
  .imgchange-2 {position:absolute;top:0;right:0;bottom:0;left:0;}
  .imagechange-3d div {transition:all 0.5s ease-in-out;}
  .imagechange-3d {perspective:1000px;}
  .imagechange-3d-inner {transform-style:preserve-3d;transition:all 1.0s linear;}
  .imagechange-3d:hover .imagechange-3d-inner {transform:rotateY(180deg);}
  .imgchange-2 {transform:rotateY(180deg);}
  .top .topcontent{
    opacity: 0.7;
  }
  .top .topcontent .detail{
    margin-top: 30px;
    font-size:18px;
    font-weight: bold;
  }
  .top .topcontent .detail:hover{
    color: red;
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
  .centerleft .hotinfo{
    height: 170px;
    border-radius: 10px;

    position: relative;
  }
  .centerleft .hotinfo img{
    display: inline-block;
    position:absolute;
    top:25px;
    left:10px;
  }
  .centerleft .hotinfo figcaption{
    text-align: left;
    width: 65%;
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
  .detail{
    cursor: pointer;
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
    text-align: center;
    position: relative;
  }
  .sidebar .sidebox img{
    width: 120px;
    height: 75px;
    float:left;
    position:absolute;
    left:0;
  }
  .sidebar .sidebox figcaption{
    width: 60%;
    text-align: left;
    float:right;
    position: absolute;
    right:0;
  }
  .moreinfo{
    width: 50px;
    height: 20px;
    opacity: 0.8;
    cursor: pointer;
    position:absolute;
    right:0;
    bottom:20px;
  }
  .centerleft h2,.sidebar h2{
    text-align: left;
  }
</style>
