<template>
    <div id="top">
      <img src="../../assets/images/arrowT.png" alt="">
    </div>
</template>

<script>
    export default {
        name: "gotop",
      mounted(){
          $(function () {
            $(window).scroll(function(){
              var s_top = $(window).scrollTop();//获取滑动高度
              if(s_top>30){
                $("#top").fadeIn(800);
              }else{
                $("#top").fadeOut(1000);
              }
            });
            $("#top").click(function () {  //返回
              $("html,body").animate({scrollTop:0},800)
            })
          })
      }
    }
</script>

<style scoped>
  #top {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: cadetblue;
    background-size: cover;
    border-radius: 5px;
    position: fixed;
    right: 10px;
    bottom: 40px;
    display: none;
    z-index: 100;
    cursor: pointer;
  }
</style>
