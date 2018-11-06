<template>
  <div class="tab">
    <fangda-jing></fangda-jing>
    <new-demo></new-demo>
    <ta-bs></ta-bs>
    </div>
</template>
<script>
    import fangdajing from '../bike/fangdajing.vue'
    import newdemo from '../bike/newdemo.vue'
    import tabs from '../bike/tabs'
    export default {
        name: "bikedetails",
        components:{
          'fangda-jing':fangdajing,
          'new-demo':newdemo,
          'ta-bs':tabs
        }
    }
</script>

<style scoped>
 .tab{
   /*background-color: #f0ebe4;*/
 }
</style>
