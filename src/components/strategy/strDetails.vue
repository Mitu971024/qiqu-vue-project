<template>
  <div>
    <div class="row">
      <div class="wrap">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><span  @click="goHome" class="Span">首页</span></el-breadcrumb-item>
          <el-breadcrumb-item><span  @click="goPre" class="Span">攻略</span></el-breadcrumb-item>
          <el-breadcrumb-item><span  @click="goType" class="Span">{{details.sType}}</span></el-breadcrumb-item>
          <el-breadcrumb-item><span class="Span1">攻略详情</span></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <h2>{{details.sTitle}}</h2>
      <hr>
      <div class="top">
        <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
        <span>{{Time}}&nbsp;&nbsp;</span>
        <span>{{details.sFrom}}&nbsp;&nbsp;</span>
        <span>点击量：{{details.smCheck}}</span>
      </div>
      <div >
        <img :src="Img1"/>
      </div>

      <div class="content">
        <pre class="pre">{{details.smIntro}}</pre>
        <img :src="Img2"/>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "strDetails",
    data(){
      return{
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
        this.$router.push({path:'/strategy'});
      },
      goType(){
        const self = this;
        if(self.details.sType === '路线攻略'){
          this.$router.push({path:'/strategy/totalwaystr'});
        }else if(self.details.sType === '骑行课堂'){
          this.$router.push({path:'/strategy/totalclassstr'});
        }else if(self.details.sType === '推荐文章'){
          this.$router.push({path:'/strategy/totalrecstr'});
        }else {
          this.$router.push({path:'/strategy'});
        }
      },
    },
    mounted(){
      this.id=this.$route.params.sId;
      // console.log(this.id);
      let _this=this;
      axios.get(`${this.$store.state.url}/strateDetails/${this.id}`)
        .then(function (result) {
          let info = eval("(" + result.request.response + ")");
          _this.details = info.data[0][0];
          // console.log(info.data[0][0]);
          _this.Time = _this.details.sTime.substring(0,10)
          _this.Img1 = _this.details.smImg.split(',')[0]
          _this.Img2 = _this.details.smImg.split(',')[1]
        }, function (err) {
          console.log(err.message)
        })
    }
  }
</script>

<style scoped>
  .Span{color: black;cursor: pointer;font-weight: bold;}
  .Span1{cursor: default;}
  .wrap {
    position: relative;
    z-index: 100;
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
