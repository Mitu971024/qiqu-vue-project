<template>
  <!-- 轮播制作 -->
    <div class="lunbotu">
      <el-carousel arrow="always" height="600px" >
        <el-carousel-item v-for="(img,index) in imgList" :key="index">
          <h3><img :src="img.url" /></h3>
        </el-carousel-item>
      </el-carousel>
    </div>
</template>

<script>
    export default {
        name: "lunbotu",
         data(){
           return{
             imgList:[
               {url:require('../../assets/img/qixing1.jpg')},
               {url:require('../../assets/img/qixing2.jpg')}
             ]
           }
         }
    }
</script>

<style>
  .lunbotu{
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    line-height: 300px;
    /*opacity: 0.75;*/
    margin: 0;
  }
  .el-carousel__item img{
    width: 100%;
    height: 600px;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
