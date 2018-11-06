<template>
  <div>
    <div class="row">
      <div class="wrap">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><span  @click="goHome" class="Span">首页</span></el-breadcrumb-item>
          <el-breadcrumb-item><span  @click="goPre" class="Span">资讯</span></el-breadcrumb-item>
          <el-breadcrumb-item><span  @click="goType" class="Span" ref="Span">{{details.zType}}</span></el-breadcrumb-item>
          <el-breadcrumb-item><span class="Span1">资讯详情</span></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <h2>{{details.zTitle}}</h2>
      <hr>
      <div class="top">
        <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
        <span>{{Time}}&nbsp;&nbsp;</span>
        <span>点击量：{{details.zCheck}}</span>
      </div>
      <div >
        <img :src="Img1"/>
      </div>

      <div class="content">
        <pre class="pre">{{details.zdContent}}</pre>
        <img :src="Img2"/>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "infoDetails",
    data(){
      return {
        details:[],
        Time:'',
        Img1:'',
        Img2:'',
      }
    },
    computed:{
      url(){
        return this.$store.state.url;
      }
    },
    methods:{
      goHome(){
        this.$router.push({path:'/'});
      },
      goPre(){
        this.$router.push({path:'/information'});
      },
      goType(){
        const self = this;
        if(self.details.zType === '热门资讯'){
          this.$router.push({path:'/information/totalhotinfo'});
        }else if(self.details.zType === '今日资讯'){
          this.$router.push({path:'/information/totaltodayinfo'});
        }else if(self.details.zType === '骑闻'){
          this.$router.push({path:'/information/totalnewinfo'});
        }else if(self.details.zType === '其他'){
          this.$router.push({path:'/information/totalotherinfo'});
        }else {
          this.$router.push({path:'/information'});
        }
      },
    },
    mounted(){
      this.id=this.$route.params.zId;
      // console.log(this.id);
      let _this=this;
      axios.get(`${this.$store.state.url}/infoDetails/${this.id}`)
        .then(function (result) {
          let info = eval("(" + result.request.response + ")");
          _this.details = info.data[0][0];
          console.log(info.data[0][0]);
          _this.Time = _this.details.zTime.substring(0,10)
          _this.Img1 = _this.details.zdImg.split(',')[0]
          _this.Img2 = _this.details.zdImg.split(',')[1]
        }, function (err) {
          console.log(err.message)
        })
    }
  }
</script>

<style scoped>
  .Span{color: black;cursor: pointer;font-weight: bold;}
  .Span1{cursor: default;}
  .Span2{display: none;}
  .wrap {
    position: relative;
    z-index: 100;
    padding-top: 12px;
    height: 50px;
    width: 100%;
  }
  .wrap .el-breadcrumb {
    height: 50px;
    line-height: 50px;
  }
  .el-breadcrumb__inner {
    cursor: pointer;
    height: 50px;
    line-height: 50px;
  }
  h2,.top{
    text-align: left;
  }
  img{
    width: 100%;
    height: 100%;
    margin:0 auto;
  }
  p{
    text-indent: 2em;
    font-size:16px;
    line-height:22px;
    letter-spacing: 2px;
  }
  .content{
    margin-top:15px;
  }
  .pre{
    white-space: pre-wrap;
    word-wrap: break-word;
    text-align: left;
    text-indent: 2em;
    border:none;
    background-color: white;
  }
</style>

