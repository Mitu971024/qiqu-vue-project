<template>
  <div class="wrap">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item><span  @click="goHome">首页</span></el-breadcrumb-item>
      <el-breadcrumb-item><span  @click="goPre">知识频道</span></el-breadcrumb-item>
      <el-breadcrumb-item>文章详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name:'bread',
    data(){
      return{

      }
    },
    methods:{
      goHome(){
        this.$router.replace({path:'/'});
      },
      goPre(){
        this.$router.back();
      },
    }
  }
</script>

<style>
  .wrap {
    position: relative;
    z-index: 100;
    height: 50px;
    width: 70%;
    margin: 0 auto;
  }
  .wrap .el-breadcrumb {
    height: 50px;
    line-height: 50px;
  }
  .el-breadcrumb__inner {
    cursor: pointer;
    height: 50px;
    line-height: 50px;
  }
</style>
