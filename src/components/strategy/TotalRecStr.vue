<template>
  <div class="total">
    <div class="wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item><span  @click="goHome" class="Span">首页</span></el-breadcrumb-item>
        <el-breadcrumb-item><span  @click="goPre" class="Span">攻略</span></el-breadcrumb-item>
        <el-breadcrumb-item><span class="Span1">{{sType}}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div v-for="(recommend,index) in totalrec" class="onediv" v-if="index<data">
      <figure>
        <h4 class="detail"  @click="torecdetails(recommend.sId)"><span>| 推荐文章 |&nbsp;&nbsp;</span>{{recommend.sTitle}}</h4>
        <img :src="recommend.sImg" alt="" class="col-sm-3">
        <figcaption class="col-sm-9">
          <article>
            <header>
              <hgroup>
                <p>{{recommend.sIntro}}</p>
              </hgroup>
            </header>
            <div class="span">
              <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
              <span>{{recommend.sTime.substring(0,10)}}&nbsp;&nbsp;</span>
              <span>{{recommend.sFrom}}</span>
            </div>
          </article>
        </figcaption>
        <hr class="hr">
      </figure>
    </div>
    <el-button :plain="true" class="more" @click="showmorestr">加载更多</el-button>
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "TotalRecStr",
      data(){
        return {
          totalrec:[],
          data:5,
          sType:'',
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
        torecdetails(index){
          this.$router.push(`/strategy/${index}`)
        },
        showmorestr(){
          if(this.data>this.totalrec.length){
            this.$message({
              showClose: true,
              message: '没有数据了！',
              type: 'success'
            });
          }
          this.data+=5;
        },
      },
      mounted(){
        let _this=this;
        axios.get(_this.$store.state.url + '/strategy/recommend')
          .then(function (result) {
            let info = eval("(" + result.request.response + ")");
            _this.totalrec = info.data[0];
            // console.log(_this.totalrec);
            _this.sType = info.data[0][0].sType;
          }, function (err) {
            console.log(err.message)
          })
      },
    }
</script>

<style scoped>
  .Span{color: black;cursor: pointer;font-weight: bold;}
  .Span1{cursor: default;}
  .wrap {
    position: relative;
    z-index: 100;
    margin-bottom: 15px;
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
  .onediv{
    height: 200px;
    margin-bottom: 20px;
    text-align: left;
    position:relative;
  }
  .onediv h4 span{
    color:red;
  }
  .detail{
    cursor: pointer;
  }
  .detail:hover{
    color:red;
  }
  .span{
    position:absolute;
    top:50px;
  }
  .hr{
    width: 100%;
    height:2px;
    background-color:#bbb;
    position:absolute;
    bottom:-20px;
  }
  .more{
    width: 200px;
    height: 50px;
    text-align: center;
    border:1px solid #cccccc;
    background-color: #fafafa;
    border-radius: 10px;
    cursor: pointer;
    font-size: 15px;
    color: #666666;
  }
  .more:hover{
    background:#ddd;
    opacity: 0.7;
  }
</style>
