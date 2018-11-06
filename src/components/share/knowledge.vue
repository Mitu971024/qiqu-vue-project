<template>
  <div class="box">
    <ul>
      <li v-for="(data,index) in datalist" :key="index">
        <img v-lazy="data.security_img" width="300" height="200" alt="" class="imgs">
        <div class="view" @click="godetails(data.security_id)"><pre>{{data.security_title}}</pre></div>
      </li>

    </ul>
    <button class="btn btn-info btn-lg">暂无更多</button>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "knowledge",
    data(){
      return{
        datalist:'',
        tops:'',
      }
    },
    computed:{
      url(){
        return this.$store.state.url;
      }
    },
    created(){
      axios.get(this.$store.state.url + '/share').then(result=>{
        // console.log(result.data.data);
        this.datalist = result.data.data;
      }).catch(err=>{
        console.log(err)
      });
    },
    methods:{
      godetails(detail_id){
        this.$router.push({path:'/share/details',query:{id:detail_id}})
      },
    }
  }
</script>

<style scoped>
  .box {
    width: 1020px;
    height: auto;
    margin: 0 auto;
  }
  .box ul {
    height: auto;
    list-style: none;
  }
  .box ul li {
    width: 300px;
    height: 200px;
    display: inline-block;
    border: 3px solid white;
    margin: 5px;
    overflow: hidden; /*超出隐藏*/
    background: url("../../assets/images/loding.gif") no-repeat center;
  }
  .box ul li:hover {
    border-color: #5F9EA0;
  }
  .box ul li:hover img {
    transform: scale3d(1.2,1.2,1.2) rotateZ(360deg);
    transition: all 2s;
  }
  .box ul li .view {
    width: 300px;
    height: 200px;
    line-height: 200px;
    text-align: center;
    cursor: pointer;
    background: rgba(0,0,0,0.5);
    transform: translateY(-404px);     /*变换,位移*/
    transition: all 0.8s ease-in-out; /*过度时间*/
  }
  .box .view pre {
    font-family: "幼圆";
    font-size: 16px;
    font-weight: bold;
    color: white;
    background: transparent;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  .box ul li:hover .view {
    transform: translateY(-204px);
    animation: move 1s ease-in-out;
  }
  @keyframes move {
    0%{
      transform: translateY(-404px);
    }
    40%{
      transform: translateY(-300px);
    }
    65%{
      transform: translateY(-252px);
    }
    82%{
      transform: translateY(-225px);
    }
    92%{
      transform: translateY(-210px);
    }
    55%,75%,87%{
      transform: translateY(-204px);
    }
  }
  .btn {
    display: block;
    width: 100px;
    margin: 0 auto 50px;
  }
</style>
