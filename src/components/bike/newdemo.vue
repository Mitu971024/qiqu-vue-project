<template>

  <div class="pic-box" width="500px" height="500px"><!--pic-box:width:500px;height:500px-->
    <!--<h3>你好</h3>-->
    <pic-zoom url="../../assets/img/giant1.1.jpg" :scale="3"> </pic-zoom>

  </div>
</template>

<script>
    import PicZoom from 'vue-piczoom'
    export default {
      name:'newdemo',
      components:{
       "pic-zoom":PicZoom
      }
    }
</script>

<style scoped>

</style>
