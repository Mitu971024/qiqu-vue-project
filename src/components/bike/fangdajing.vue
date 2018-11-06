<template>
  <div class="head">
    <div class="nav"></div>
    <div v-for="item in mydata">
      <el-col :span="10" height="600px">
        <div id="mydiv">
          <div v-if="type == 0"><img :src="item.cBigimg.split(',')[0]"/></div>
          <div v-else-if="type == 1"><img :src="item.cBigimg.split(',')[1]"/></div>
          <div v-else-if="type == 2"><img :src="item.cBigimg.split(',')[2]"/></div>
          <div v-else><img :src="item.cBigimg.split(',')[3]"/></div>
          <ul>
            <li v-on:click="show(0)"><img :src="item.cBigimg.split(',')[0]"/></li>
            <li v-on:click="show(1)"><img :src="item.cBigimg.split(',')[1]"/></li>
            <li v-on:click="show(2)"><img :src="item.cBigimg.split(',')[2]"/></li>
            <li v-on:click="show(3)"><img :src="item.cBigimg.split(',')[3]"/></li>
          </ul>
        </div>
      </el-col>
      <el-col :span="10" class="two">
        <h4 class="name"><strong>{{item.cName}}</strong></h4>
        <div class="right">
          <div class="r-one">
            系列：<span>{{item.cIntr}}</span>
          </div>
          <div class="r-two">
            价格：<span class="red">￥{{item.cPrice}}</span>
          </div>
          <div class="r-three">
            快递免邮 服务：<span>七天无理由运费险</span>
          </div>
          <div class="r-four">
            本店活动 <span>满1件,包邮；满2件,送50元店铺优惠券</span>
          </div>
        </div>
        <div class="middle">
          <div class="m-one" checked>速别&nbsp;<div class="speed">{{item.speed}}</div></div>
          <div>轮径尺寸&nbsp;<div class="size">{{item.size}}</div></div>
        </div>
        <div class="number">
          <span >该商品当前库存为{{item.cNumber}}件</span>
        </div>
        <router-link to="/shoppingcart"><button class="shoppingcart" @click="addshop">立即购买</button></router-link>
      </el-col>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "fangdajing",
    data() {
      return {
        type: "0",
        mydata: [],
        number: 1,
        Img1:'',
        Img2:'',
        Img3:'',
        Img4:'',
        cName:'',
        cIntr:'',
        cPrice:'',
        cNumber:'',
        speed:'',
        size:'',
      }
    },
    computed:{
      url(){
        return this.$store.state.url;
      }
    },
    methods: {
      show: function (index) {
        this.type = index;
      },
      sub: function () {
        if (this.number < 1) return;
        this.number--;
      },
      add: function () {
        this.number++;
      },
      addshop(){
        let _this = this;
        axios.post(_this.$store.state.url + '/bike/details/addshop',{
          mId: window.localStorage.mId,
          cNo:_this.$route.params.cNo,
        }).then(function (response) {
          console.log(response.data);
        })
        // _this.$message({
        //   showClose: true,
        //   message: '',
        //   type: 'success'
        // });
        alert("已成功添加到购物车!")

      }
    },
    created() {
      let _this = this;
      axios.post(_this.$store.state.url + '/bike/details',
        {cNo:_this.$route.params.cNo}).then(function (response) {
        console.log("00"+response.data.data);
        _this.mydata = response.data.data;

      }).catch(function (error) {
        console.log(error);
      })
    }

  }

</script>

<style scoped>

  .nav {
    margin-left: 10%;
    width: 80%;
    height: 40px;
    background: olivedrab;
    /*背景图上直接叠加一层半透明白色条纹*/
    background-image:repeating-linear-gradient(45deg,hsla(0,0%,100%,.1), hsla(97, 78%, 44%, 0.1) 15px, olivedrab 0, #6b8e23 30px);
  }
  #mydiv {
    width: 500px;
    height: 500px;

    margin-top: 10%;
    margin-left: 20%;
  }

  #mydiv div img {
    border: 1px solid #cecece;
    width: 400px;
    height: 400px;
  }

  ul {
    list-style: none;
  }

  ul li {
    float: left;
    cursor: pointer;
    margin-left: 28px;
    margin-top: 10px;
  }
  ul li:first-child{
    border: 2px solid olivedrab;
  }
  ul li:hover {
    border: 2px solid olivedrab;
  }

  ul li img {
    width: 62px;
    height: 58px;
  }

  /*!!!!!!!!!!!!!!!!!!!*/
  .two{
    margin-left:8%;
    width: 50%;
    text-align: left;
    margin-top: -8%;
  }
  .name {
    margin-top:24%;
  }
  /******** right ******/
  .right {
    width: 420px;
    height: 200px;
    /*color: white;*/
    background-image: url("../../assets/img/bg8.jpg");
    text-align: left;
    padding-left: 2%;
    opacity: 0.8;
  }
  .r-one{
    height: 30px;
    line-height: 80px;
    margin-top: 2%;
  }
  .r-two{
    height:80px;
    line-height: 100px;
  }
  .r-three{
    height: 40px;
    line-height: 40px;
  }
  .r-four{
    height: 40px;
    line-height: 40px;
  }
  .right h4 {
    padding-top: 8%;
  }

  .right span {
    color: olivedrab;
    font-size: 14px;
  }

  .right .red {
    color: olivedrab;
    font-size: 36px;
    font-weight: bolder;
  }

  .shoppingcart {
    width: 360px;
    height: 60px;
    background-color: olivedrab;
    color: white;
    font-size: 18px;
    margin-top: 4%;
    border: 1px solid olivedrab;
  }
  /******* number ******/
  .number {
    /*color: olivedrab;*/
    font-size: 16px;
    margin-top: 4%;
  }
  .number .one,.number .two{
    color: #cecece;
  }
  .number input {
    width: 50px;
  }

  .sub, .addNum {
    width: 30px;
    height: 30px;

  }
  /******middle*******/
  .middle{
    font-size: 16px;
    /*color: #cecece;*/
  }
  .middle div{
    margin-top: 1%;
  }

  .speed,.size{
    width: 60px;
    color: black;
    border: 1px solid #acacac;
    cursor: pointer;
    display: inline-block;
    text-align: center;
  }
  .speed:hover,.size:hover{
    border: 1px solid olivedrab;
  }


</style>
