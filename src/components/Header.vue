<template>
  <div>
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed marginT1" data-toggle="collapse" data-target="#navbar" aria-expanded="false">
            <span class="sr-only"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand">
            <img alt="骑趣" src="../assets/images/logo-2.png">
          </a>
        </div>
        <div class="collapse navbar-collapse marginT" id="navbar">
          <ul class="nav navbar-nav ulStyle">
            <router-link tag="li" class="liStyle" role="presentation" to="/" exact><a>
              <span class="line line-top"></span>
              <span class="line line-right"></span>
              <span class="line line-bottom"></span>
              <span class="line line-left"></span>
              首页</a>
            </router-link>
            <router-link tag="li" class="liStyle" role="presentation" to="/information" exact><a>
              <span class="line line-top"></span>
              <span class="line line-right"></span>
              <span class="line line-bottom"></span>
              <span class="line line-left"></span>
              资讯</a>
            </router-link>
            <router-link tag="li" class="liStyle" role="presentation" to="/strategy" exact><a>
              <span class="line line-top"></span>
              <span class="line line-right"></span>
              <span class="line line-bottom"></span>
              <span class="line line-left"></span>
              攻略</a>
            </router-link>
            <router-link tag="li" class="liStyle" role="presentation" to="/bike" exact><a>
              <span class="line line-top"></span>
              <span class="line line-right"></span>
              <span class="line line-bottom"></span>
              <span class="line line-left"></span>
              装备</a>
            </router-link>
            <router-link tag="li" class="liStyle" role="presentation" to="/share" exact><a>
              <span class="line line-top"></span>
              <span class="line line-right"></span>
              <span class="line line-bottom"></span>
              <span class="line line-left"></span>
              知识频道</a>
            </router-link>
            <router-link tag="li" class="liStyle" role="presentation" to="/shareInfo" exact><a>
              <span class="line line-top"></span>
              <span class="line line-right"></span>
              <span class="line line-bottom"></span>
              <span class="line line-left"></span>
              分享</a>
            </router-link>
          </ul>
          <ul class="nav navbar-nav navbar-right co-2">
            <li @click="Shop" class="S1"><a class="glyphicon glyphicon-shopping-cart">
              <span>购物车</span>
            </a></li>
            <li @click="Login" class="s1" v-if="this.$store.state.index != 1"><a class="glyphicon glyphicon-user">
              <span>登录</span>
            </a></li>
            <li class="b1" @mouseover="ulOver" @mouseout="ulOut" v-else="this.$store.state.index == 1">
              <div class="img"><img :src="myPic1" alt=""></div>
              <ul style="display: none;" ref="ulStyle">
                <!--<li class="li1 li2"><a>个人空间</a></li>-->
                <li class="li1 li2" @click="mysetting"><a>个人设置</a></li>
                <li class="li2" @click="myShop"><a>个人订单</a></li>
                <li class="li2" @click="tuiChu"><a>退出登录</a></li>
              </ul>
            </li>
            <!--<li><a class="glyphicon glyphicon-comment"></a></li>-->
            <!--<router-link tag="li" to="/setting"><a class="glyphicon glyphicon-comment"></a></router-link>-->
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "Header",
    data(){
      return {
        myPic1:'',
      }
    },
    computed:{
      index(){
        return this.$store.state.index;
      },
      url(){
        return this.$store.state.url;
      }
    },
    mounted(){
      this.init();
    },
    watch:{
      '$route' (to,from) {
        if(to.path=='/' && from.path=='/login'){
          const self = this;
          const storage = window.localStorage;
          self.myPic1 = self.$store.state.url + storage.mImg;
        }
      }
    },
    methods:{
      init(){
        const self = this;
        const storage = window.localStorage;
        self.$store.state.index = storage.index;
        self.myPic1 = self.$store.state.url + storage.mImg;
      },
      ulOver(){
        const self = this;
        self.$refs.ulStyle.style.display = 'block';
      },
      ulOut(){
        const self = this;
        self.$refs.ulStyle.style.display = 'none';
      },
      Login(){
        this.$router.replace('/login')
      },
      // setting(){
      //   const self = this;
      //   if(self.$store.state.index != 1){
      //     self.$router.push({path: '/'})
      //   }
      // },
      mysetting(){
        const self = this;
        self.$router.push({path: '/setting'})
      },
      tuiChu(){
        const self = this;
        if(!window.localStorage){
          alert("浏览器支持localstorage");
        }else{
          const storage = window.localStorage;
          storage.index = '';
          storage.mImg = '';
          self.$store.state.index = storage.index;
          // storage.removeItem("data");
          self.$router.replace({path: '/'});

        }
      },
      myShop(){
        const self = this;
        self.$router.push({path: '/order'})
      },
      Shop(){
        const self = this;
        if(self.$store.state.index == 1){
          self.$router.push({path: '/shoppingcart'})
        }else {
          self.$message({
            showClose: true,
            message: '请先登录！',
            type: 'info'
          });
          self.$router.push({path: '/login'})
        }
      }
    }
  }
</script>


<style scoped>
  nav{border: 0}
  .navbar{
    margin-bottom: 0;
    height: 110px;
    background-color: rgb(69,69,69);
  }
  .navbar-brand{
    padding: 0;
    width: 160px;
    height: 110px;
  }
  .navbar-brand img{width: 160px;height: 110px;transform:rotate(-8deg);}
  .marginT1{margin-top: 33px;}
  .navbar-right{margin-right: 1%}
  .marginT{margin-top: 30px;}
  .s1{position: relative;cursor: pointer;}
  .s1>a>span{position: absolute;bottom: -8px;left: 9px;
    display: none;
  }
  .S1{position: relative;width: 60px;margin-top: -10px;cursor: pointer;}
  .S1>a>span{position: absolute;bottom: -8px;left: 9px;}
  .b1{position: relative;background-color: #666;border-radius:12px;}
  .b1 .img{
    width: 50px;
    height: 50px;
  }
  .b1 .img>img{
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }
  .b1>ul{
    list-style: none;
    width: 100px;
    background-color: rgb(69,69,69);
    padding-left: 0;
    position: absolute;
    top: 50px;
    left: -28px;
    z-index:999;
  }
  .b1>ul>.li1{margin-top: 40px;}
  .b1>ul>.li2{margin-bottom: 20px;cursor: pointer;}
  .b1>ul>li>a{text-decoration: none;color: gray;}
  .b1>ul>li>a:hover{color: white;}
  .s1:hover>a>span{display: block;cursor: pointer;}
  .S1:hover>a>span{cursor: pointer;}
  .co-2>li>a{color: yellow;}
  .co-2>li{margin-right: 30px;}
  .ulStyle{width: 75%}
  .ulStyle>li{
    width: 16%;
    font-size: 18px;
  }
  .liStyle{position: relative;}
  .liStyle:hover{
    background-position:174px center;}
  .liStyle .line{
    position:absolute;
    background:none;
    transition:ease 0.4s;
  }
  .liStyle:hover .line{background:#eee;}
  .liStyle .line-top{
    width:0;
    height:2px;
    left:-110%;
    top:-2px;}
  .liStyle:hover .line-top{width:100%;left: 0;}
  .liStyle .line-right{
    width:2px;
    height:0;
    right:-2px;
    top:-110%;}
  .liStyle:hover .line-right{height:100%;top: 0;}
  .liStyle .line-bottom{
    width:2px;
    height:0;
    left:-2px;
    bottom:-110%;}
  .liStyle:hover .line-bottom{height:100%;bottom: 0;}
  .liStyle .line-left{width:0;
    height:2px;
    right:-110%;
    bottom:-2px;}
  .liStyle:hover .line-left{width:100%;right: 0;}
  @media(max-width: 768px) {
    .navbar{
      z-index: 200;
    }
    #navbar{
      margin-top: 0;
      z-index: 200;
      padding-left: 30px;
    }
    .liStyle>a:hover{color: black;}
    .s1{position: relative;width: 12%;}
    .s1>a>span{position: absolute;bottom: -8px;left: 30%;
      display: none;
    }
  }
</style>

