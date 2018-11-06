<template>
  <div>
    <div class="container">
      <div class="myShop row">
        <div class="col-xs-2 left">
          <div class="img"><img :src="myPic" alt=""></div>
          <div class="mySet">我的订单</div>
        </div>
        <div class="col-xs-10 right">
          <!--<img src="../../assets/img/bike1.png">-->
          <nav class="navbar navbar-default">
            <div class="collapse navbar-collapse">
              <ul class="nav navbar-nav liStyle">
                <li class="col-xs-3 liActive" @click="liOne" ref="liStyle1"><a>待发货</a></li>
                <li class="col-xs-3" @click="liTwo" ref="liStyle2"><a>待收货</a></li>
                <li class="col-xs-3" @click="liThree" ref="liStyle3"><a>待付款</a></li>
                <li class="col-xs-3" @click="liFour" ref="liStyle4"><a>待完成</a></li>
              </ul>
            </div>
          </nav>
          <div v-if="isshow == 1" >
            <div class="t1" v-for="item in order">
              <h4>订单已完成</h4>
              <img :src="item.oImg">
              <p>商品名称：{{item.oName}}</p>
              <p>数量*{{item.oNum}}</p>
              <p>价格：￥{{item.oPrice}}</p>
              <button class="del" @click="delet(item.mId,item.cNo)">删除</button>
            </div>
          </div>
          <div v-if="isshow == 2" ></div>
          <div v-if="isshow == 3" ></div>
          <div v-if="isshow == 4" ></div>
          <router-link tag="button" to="/bike" class="btn btn-default button1">返回装备页</router-link>
        </div>
      </div>
    </div>
    <app-foot></app-foot>
  </div>

</template>

<script>
  import Foot from '../Foot'
  import axios from 'axios'
  export default {
    name: "submit",
    data() {
      return {
        isshow: 1,
        order:[],
        myPic:'',
      }
    },
    components:{
      'app-foot':Foot,
    },
    computed:{
      url(){
        return this.$store.state.url;
      }
    },
    methods:{
      liOne(){
        this.isshow = 1;
        this.$refs.liStyle1.className = 'col-xs-3 liActive';
        this.$refs.liStyle2.className = 'col-xs-3';
        this.$refs.liStyle3.className = 'col-xs-3';
        this.$refs.liStyle4.className = 'col-xs-3';
      },
      liTwo(){
        this.isshow = 2;
        this.$refs.liStyle1.className = 'col-xs-3';
        this.$refs.liStyle2.className = 'col-xs-3';
        this.$refs.liStyle2.className = 'col-xs-3 liActive';
        this.$refs.liStyle3.className = 'col-xs-3';
      },
      liThree(){
        this.isshow = 3;
        this.$refs.liStyle1.className = 'col-xs-3';
        this.$refs.liStyle2.className = 'col-xs-3';
        this.$refs.liStyle3.className = 'col-xs-3 liActive';
        this.$refs.liStyle4.className = 'col-xs-3';
      },
      liFour(){
        this.isshow = 4;
        this.$refs.liStyle1.className = 'col-xs-3';
        this.$refs.liStyle2.className = 'col-xs-3';
        this.$refs.liStyle3.className = 'col-xs-3';
        this.$refs.liStyle4.className = 'col-xs-3 liActive';
      },
      delet(mId,cNo){
        axios.post(`${this.$store.state.url}/order/delete`,
          {
            mId:window.localStorage.mId,
            cNo: cNo,
          }).then(function (result) {
          console.log(result.data);
          console.log(mId)
          console.log(cNo)
        });
        this.$message({
          showClose: true,
          message: '订单删除成功！',
          type: 'success'
        });
      }
    },
    created(){
      let _this=this;
      _this.myPic = _this.$store.state.url + window.localStorage.mImg;
      axios.post(_this.$store.state.url + '/order/showorder').then(function (response) {
        console.log(response.data);
        _this.order = response.data.data;
      }).catch(function (error) {
        console.log(error);
      })
    }
  }
</script>

<style scoped>
  .myShop{
    padding-bottom: 20px;
  }
  .left{
    height: 900px;
    margin-top: 20px;
    background: rgb(69,69,69);
    padding: 0;
  }
  .img{
    width: 165px;
    height: 165px;
    background-color: white;
    border-radius: 80px;
    margin-top: 50px;
    margin-left: 15px;
  }
  .img>img{
    width: 165px;
    height: 165px;
    border-radius: 80px;
  }
  .right{
    height: 880px;
    margin-top: 20px;
    padding: 0;
  }
  .navbar-default{
    background-color: white;
    border: 0;
  }
  .liStyle{
    margin-top: 50px;
    width: 965px;
    margin-left: 10px;
    border-bottom: 1px solid #666;
  }
  .liStyle>li{
    cursor: pointer;
    margin-bottom: 30px;
  }
  .liActive{
    font-size: 22px;
    font-weight: bolder;
  }
  .liStyle>li:hover{font-weight: bold;color: black;}
  .mySet{
    width: 195px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    margin-top: 50px;
    font-size: 20px;
    background-color: #777;
    color: white;
  }
  .t1 img{
    width: 90px;
    height: 90px;
    float: left;
    margin-left: 22%;
    /*margin-top: 1%;*/
  }
  button{
    width: 100px;
    height: 40px;
    border: none;
    background-color: #7d7778;
    color: white;
    margin-left: 5%;
    margin-top: 5%;
  }
  .t1{
    box-shadow: 1px 1px 2px 2px rgba(125, 119, 120, 0.39);
    /*background-color: rgba(220, 220, 220, 0.19);*/
    /*border: 1px solid #cecece;*/
    border-radius: 3px;
    height: 150px;
    margin-top: 5%;
    width: 80%;
    margin-left: 12%;
  }
  p{
    width: 200px;
    text-align: left;
    margin-left: 40%;
    /*padding-left: 2%;*/
  }
  .t1 h4{
    margin-left: 10%;
    width: 80%;
    height: 30px;
    line-height: 30px;
    text-align: left;
    border-bottom: 1px dashed rgba(125, 119, 120, 0.39);
  }
  .del{
    width: 60px;
    height: 30px;
    border: none;
    background-color: rgba(108, 102, 103, 0.4);
    color: white;
    margin-left: 73%;
    margin-top: -7%;
    float: left;
  }
</style>



