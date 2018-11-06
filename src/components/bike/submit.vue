<template>
  <div>
    <div class="submit">
      <h5>ok,您的订单已经生成啦，赶紧去付款呐，30分钟之内未付款，订单将会自动取消。</h5>
      <img src="../../assets/img/bike1.png">
      <ul>
        <li>您的订单号是：{{createCode}}</li>
        <li>收件人:{{exp[0].sName}}</li>
        <li>手机号码:{{exp[0].sphoneNumber}}</li>
        <li>收件地址:{{exp[0].sAddress}}</li>
        <li>配送时间：周一到周五</li>
      </ul>
      <router-link to="/bike">
        <button>返回首页</button>
      </router-link>
      <router-link to="/order">
        <button>查看订单</button>
      </router-link>
    </div>
    <app-foot class="foot"></app-foot>
  </div>
</template>

<script>
  import Foot from '../Foot'
  import axios from 'axios'
  export default {
    data(){
      return{
        exp:[],
      }
    },
    name: "submit",
    components:{
      'app-foot':Foot,
    },
    computed: {
      createCode() {
        let code = "";
        const codeLength = 10;//随机码的长度
        const random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);//随机数
        for (let i = 0; i < codeLength; i++) {
          //循环操作
          const index = Math.floor(Math.random() * 10);//取得随机数的索引（0~10）
          code += random[index];//根据索引取得随机数加到code上
        }
        return (code);//把code值赋给随机码
      },
      url(){
        return this.$store.state.url;
      }
    },
    created(){
      let _this=this
      axios.post(_this.$store.state.url + '/order/showexp').then(function (response) {
        // console.log(response.data);
        _this.exp = response.data.data;
      }).catch(function (error) {
        console.log(error);
      })
    }

  }
</script>

<style scoped>

  .submit{
    /*border-top:1px solid orangered;*/
    width: 70%;
    height: 520px;
    margin-left: 15%;
    padding-top: 30px;
  }
  hr{
    height: 1px;
    background-color: #ff7e44;
  }
  ul{
    list-style: none;
    text-align: left;
    margin-left: 35%;
  }
  img{
    width: 80px;
    height: 80px;
    float: left;
    margin-left: 25%;
  }
  button{
    width: 100px;
    height: 40px;
    border: none;
    background-color: #ff7e44;
    color: white;
    margin-left: 3%;
    margin-top: 3%;
  }
  .foot{margin-top: 70px;}
</style>
