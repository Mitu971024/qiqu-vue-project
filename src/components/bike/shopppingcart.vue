<template>
  <div>
    <div class="shop">
      <div class="head"></div>
      <div class="shopping">
        <h3>我的购物车</h3>
        <img class="car" src="../../assets/img/购物车.png">
        <hr>
        <div class="s-one">
          <ul>
            <li>选择</li>
            <li>商品详情</li>
            <li>单价(元)</li>
            <li>数量</li>
            <li>小计</li>
            <li>操作</li>
          </ul>
        </div>
      </div>
      <div class="s-two" v-for="item in good">
        <span><input type="checkbox" v-model="checkname" :value="item"> </span>
        <span class="s2"><img :src="item.cBigimg.split(',')[0]" class="s1">
            {{item.cIntr}}
      </span>
        <span class="s3">￥{{item.cPrice}}</span>
        <span>
      <button class="addNum" @click="add(item)">+</button>
      <input id="num" type="text" class="quantity" v-model="item.number"  />
      <button class="sub" @click="sub(item)">-</button>
      </span>
        <span class="s4">&nbsp;&nbsp;{{item.cPrice*item.number}}</span>
        <span><button class="delete" @click="delet(item.mId,item.cNo)">删除</button></span>
      </div>
      <div class="s-three">
        <p>合计：{{total}}</p>
        <button>取消购买</button>
        <router-link to="/confirm"><button @click="send1">立即购买</button></router-link>
      </div>
      <router-view></router-view>
    </div>
    <app-foot class="foot"></app-foot>
  </div>
</template>

<script>
  import axios from 'axios'
  import Foot from '../Foot'
  export default {
    name: "shopppingcart",
    data() {
      return {
        ndex:0,
        sum:0,
        good: [],
        checkname:[],
      }
    },
    components:{
      'app-foot':Foot,
    },
    computed:{
      total(){
        let total=0
        for(let i=0;i<this.good.length;i++){
          for(let j=0;j<this.checkname.length;j++) {
            if (this.good[i].cNo==this.checkname[j].cNo){
              total += this.good[i].cPrice * this.good[i].number
            }
          }
        }
        return( total)
      },
      url(){
        return this.$store.state.url;
      }
    },
    methods: {
      send1(){
        this.$store.state.checkgood=this.checkname
      },
      sub: function (item) {
        if(item.number>1){
          item.number--;
          this.ndex=this.ndex+1
        }
      },
      add: function (item) {
        item.number++;
        this.ndex=this.ndex+1
      },
      delet(mId,cNo){
        axios.post(`${this.$store.state.url}/bike/delete`,
          {
            mId: mId,
            cNo: cNo,
          }).then(function (result) {
          // console.log(result.data);
        });
        window.location.reload();
      }
    },
    created(){
      let _this = this;
      axios.post(_this.$store.state.url + '/bike/details/showshop')
        .then(function (response) {
          console.log(response.data);
          // _this.good = response.data.data;
          let newgood=response.data.data;
          // let number=0;
          for(let i=0;i<newgood.length;i++){
            newgood[i].number=1
          }
          _this.good=newgood

        }).catch(function (error) {
        console.log(error);
      })

    }
  }
</script>

<style scoped>
  .shop{
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .head{
    text-align: center;
    width: 100%;
    height: 40px;
    background: #ff7e44;
    background-image:repeating-linear-gradient(45deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,.1)15px, #ff7e44 0, #ff7e44 30px);

  }
  .shopping{
    /*border: 1px solid #1aa9ff;*/
    width: 80%;
    margin-top: 3%;
    margin-left: 10%;
  }
  .shopping ul{
    margin-left: 6%;
  }
  .shopping ul li{
    list-style: none;
    float: left;
    width: 140px;
  }
  h3{
    margin-left: -60%;
  }
  hr{
    background-color: #e58830;
    height: 1px;
    border:none;
    width: 80%;
  }
  .s-one{
    height: 40px;
  }
  .s-two{
    /*border-top:1px solid #cecece;*/
    width: 70%;
    margin-left: 14%;
  }
  .s-two img{

    height: 60px;
    width: 60px;
  }
  .s-two span{
    width: 80px;
    margin-left: 7%;
  }

  #num{
    width: 40px;
  }
  .s-three{
    margin-left: 44%;
    margin-top: 4%;
  }
  .s-three button{
    border: none;
    background-color: #ff7e44;
    width: 120px;
    height: 40px;
    color: white;
  }
  .car{
    width: 100px;
    height: 60px;
    float: left;
    margin-top: -5%;
    margin-left: 24%;
  }

  .addNum,.sub{
    border: 0;
    /*border: 1px solid grey;*/
    background-color: #f28918;
    color: #fafafa;
  }
  .delete{
    width: 60px;
    height: 30px;
    border: 0;
    background-color: #f28918;
    color: #fafafa;

  }
  .foot{margin-top: 50px;}
</style>
