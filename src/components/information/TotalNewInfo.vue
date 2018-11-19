<template>
  <div class="total">
    <div class="wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item><span  @click="goHome" class="Span">首页</span></el-breadcrumb-item>
        <el-breadcrumb-item><span  @click="goPre" class="Span">资讯</span></el-breadcrumb-item>
        <el-breadcrumb-item><span class="Span1">{{zType}}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div v-for="(newinfo,index) in totalnewinfo" class="onediv" v-if="index<data">
      <figure>
        <h4 class="detail"  @click="tonewdetails(newinfo.zId)"><span>| 骑闻 |&nbsp;&nbsp;</span>{{newinfo.zTitle}}</h4>
        <img :src="newinfo.zImg" alt="" class="col-sm-3">
        <figcaption class="col-sm-9">
          <article>
            <header>
              <hgroup>
                <p>{{newinfo.zContent}}</p>
              </hgroup>
            </header>
            <div class="span">
              <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
              <span>{{newinfo.zTime.substring(0,10)}}&nbsp;&nbsp;</span>
              <span>{{newinfo.zFrom}}</span>
            </div>
          </article>
        </figcaption>
        <hr class="hr">
      </figure>
    </div>
    <el-button :plain="true" class="more" @click="showmoreinfo">加载更多</el-button>
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "TotalNewInfo",
      data(){
        return {
          totalnewinfo:[],
          data:5,
          zType:'',
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
        tonewdetails(index){
          this.$router.push(`/information/${index}`)
        },
        showmoreinfo(){
          if(this.data>this.totalnewinfo.length){
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
        let _this = this;
        axios.get(_this.$store.state.url + '/information/news')
          .then(function (result) {
              let info = eval("(" + result.request.response + ")");
              _this.totalnewinfo = info.data[0];
            _this.zType = info.data[0][0].zType;
            }, function (err) {
              console.log(err.message)
            }
          )},

    }
</script>

<style scoped>
  .Span{color: black;cursor: pointer;font-weight: bold;}
  .Span1{cursor: default;}
  .wrap {
    position: relative;
    z-index: 100;
    padding-top: 10px;
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
    color:olivedrab;
  }
  .detail{
    cursor: pointer;
  }
  .detail:hover{
    color:olivedrab;
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
