<template>
  <div>
    <div class="share">
      <app-accordion></app-accordion>
      <app-title></app-title>
      <knowledge-list></knowledge-list>
      <go-top></go-top>
    </div>
    <app-foot></app-foot>
  </div>
</template>

<script>
  import Foot from '../Foot'
  import appAccordion from './accordion';
  import appTitle from './title';
  import knowledgeList from './knowledge';
  import goTop from './gotop'
 export default {
   name:'Share',
   data() {
     return{
     }
   },
   components:{
     appAccordion,
     appTitle,
     knowledgeList,
     goTop,
     "app-foot":Foot,
   },
 }
</script>

<style scoped="scoped">
  .share {
    background: #eee;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: left;
  }

</style>
