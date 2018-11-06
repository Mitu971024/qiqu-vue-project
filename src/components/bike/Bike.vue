<template>
  <div class="e">
    <div class="container rowB1 ">
      <!-- 轮播制作 -->
      <div class="bike">
        <router-view></router-view>
      </div>
    </div>
    <goTop></goTop>
    <app-foot></app-foot>
  </div>
</template>

<script>
  import goTop from '../share/gotop.vue'
  import Foot from '../Foot.vue'
  export default {
       name: "Bike",
    components:{
      goTop,
      "app-foot":Foot
    }
  }
</script>


<style scoped>
  .e {
    background-color: #f5f5f5;
  }

  .rowB1 {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .bike {
    width: 100%;
    /*height: 2000px;*/
    /*background-color: #e6f0df;*/
    /*background-color:#f5f5f5;*/

    opacity: 0.9;
    margin: 0;
    padding: 0;
  }
</style>
