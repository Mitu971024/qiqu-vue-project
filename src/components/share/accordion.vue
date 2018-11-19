<template>
  <div class="box">
    <div id="container">
      <ul>
        <li class="lis">
          <div class="title"><p>每一次艰难的跋涉,都是磨练心志的修行</p></div>
        </li>
        <li class="lis">
          <div class="title"><p>有时候觉得，张开双臂骑行的姿态比鸟儿更像飞翔</p></div>
        </li>
        <li class="lis">
          <div class="title"><p>看那不息的车轮，犹如生命的轮回！</p></div>
        </li>
        <li class="lis">
          <div class="title"><p>如果有谁羁绊了你的脚步，你只需让你的车轮碾过尘土。</p></div>
        </li>
        <li class="lis">
          <div class="title"><p>旅行，就是离开熟悉的地方，然后不一样的归来。</p></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "accordion",
    methods:{
      fn () {
        var lis = document.getElementsByClassName('lis')
        for (var i = 0; i < lis.length; i++) {
          lis[i].index = i;
          lis[i].onclick = function(){
            var num = this.index;
            for (var i = 0; i < lis.length; i++) {
              lis[i].style.width = "75px";
            }
            lis[num].style.width = "700px"
          }
        }
      }
    },
    mounted() {
      this.fn();
    }
  }
</script>

<style scoped>
  .box{
    width: 70%;
    height: 450px;
    margin: 0 auto;
    border-radius: 0 0 5px 5px;
  }
  #container{
    width: 100%;
    height: 450px;
    position: relative;
    overflow: hidden;
  }
  ul{
    width: 9999px;
    height: 100%;
    list-style: none;
  }
  li{
    width: 75px;
    height: 450px;
    border-radius: 10px;
    float: left;
    cursor: pointer;
    transition: 1s;
    background: url('../../assets/images/10.jpg') no-repeat top;
    background-size: cover;
  }
  ul li:nth-child(2){
    background: url('../../assets/images/14.jpg');
    background-size: cover;
  }
  ul li:nth-child(3){
    background: url('../../assets/images/12.jpg');
    background-size: cover;
  }
  ul li:nth-child(4){
    background: url('../../assets/images/13.jpg') no-repeat top;
    background-size: cover;
  }
  ul li:nth-child(5){
    background: url('../../assets/images/11.jpg') no-repeat top;
    background-size: cover;
    width: 700px;
  }
  #container .title{
    width: 75px;
    height: 450px;
    background: rgba(0,0,0,.5);
    text-align: center;
  }
  p{
    padding: 40px 30px;
    font-size: 13px;
    color: #f5f5f5;

  }
</style>

