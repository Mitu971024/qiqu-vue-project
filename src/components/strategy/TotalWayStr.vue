<template>
  <div class="total">
    <div class="wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item><span  @click="goHome" class="Span">首页</span></el-breadcrumb-item>
        <el-breadcrumb-item><span  @click="goPre" class="Span">攻略</span></el-breadcrumb-item>
        <el-breadcrumb-item><span class="Span1">{{sType}}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div v-for="(strway,index) in totalways" class="onediv" v-if="index<data">
      <figure>
        <h4 class="detail"  @click="towaydetails(strway.sId)"><span>| 路线攻略 |&nbsp;&nbsp;</span>{{strway.sTitle}}</h4>
        <img :src="strway.sImg" alt="" class="col-sm-3">
        <figcaption class="col-sm-9">
          <article>
            <header>
              <hgroup>
                <p>{{strway.sIntro}}</p>
              </hgroup>
            </header>
            <div class="span">
              <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
              <span>{{strway.sTime.substring(0,10)}}&nbsp;&nbsp;</span>
              <span>{{strway.sFrom}}</span>
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
        name: "TotalWayStr",
      data(){
          return {
            totalways:[],
            data:7,
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
        towaydetails(index){
          this.$router.push(`/strategy/${index}`)
        },
        showmorestr(){
          if(this.data>this.totalways.length){
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
        axios.get(_this.$store.state.url + '/strategy/way')
          .then(function (result) {
            let info = eval("(" + result.request.response + ")");
            _this.totalways = info.data[0];
            // console.log(_this.totalways);
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
