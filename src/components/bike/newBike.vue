<template>
  <!-- 轮播制作 -->
  <div class="bike">
    <lunbo-tu></lunbo-tu>
    <guanggao-lan></guanggao-lan>

    <ca-rd></ca-rd>
  </div>
</template>

<script>
  import lunbotu from '../bike/lunbotu.vue'
  import guanggaolan from '../bike/guanggaolan.vue'
  import card1 from './card1.vue'

  export default {
    name: "newBike",
    components:{
      'lunbo-tu':lunbotu,
      'guanggao-lan':guanggaolan,
      'ca-rd':card1,
    }
  }
</script>


<style scoped>

</style>

