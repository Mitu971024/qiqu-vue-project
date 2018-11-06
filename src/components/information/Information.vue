<template>
  <div class="bg-1">
    <div class="container">
      <router-view></router-view></div>
    <goTop></goTop>
    <app-foot class="marginT"></app-foot>
  </div>
</template>

<script>
  import goTop from '../share/gotop'
  import Foot from '../Foot.vue'
  export default {
    name: "Information",
    components:{
      goTop,
      'app-foot':Foot,
    },
  }
</script>

<style scoped>
  .marginT{margin-top: 25px;}
  .bg-1{background-color: #f5f5f5}
</style>
