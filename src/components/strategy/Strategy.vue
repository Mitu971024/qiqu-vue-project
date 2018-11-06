<template>
  <div class="rowB1">
    <div class="container">
      <router-view></router-view>
    </div>
    <goTop></goTop>
    <app-foot class="marginT"></app-foot>
  </div>
</template>

<script>
  import goTop from '../share/gotop'
  import Foot from '../Foot.vue'
  export default {
    name: "Strategy",
    components:{
      goTop,
      'app-foot':Foot,
    }
  }
</script>

<style scoped>
  .rowB1{padding-top: 20px;background-color: #f5f5f5;}
  .marginT{margin-top: 25px;}
</style>
