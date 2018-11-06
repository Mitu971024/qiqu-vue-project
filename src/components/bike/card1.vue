<template>
  <div>
    <div  class="card" >
      <el-row >
        <el-col :span="6" v-for="(img,index) in imgList" :key="index">
          <!--<input type="button" value="button" @click="taggle">-->
          <el-card  class="box " :body-style="{ padding: '0px' }" shadow="hover">
            <img :src="img.url" class="image">
            <div style="margin-left: 6%;text-align: left">
              <span style="">{{info[index].cName}}</span>
              <div class="bottom clearfix">
                价格： <span style="color: red">￥{{info[index].cPrice}}</span>
                <router-link :to="`bike/bikedetails/${info[index].cNo}`">
                  <button  class="button">查看</button>
                </router-link>
                <!--<router-link tag="el-button" type="button" to=`bike/bikedetails/${info[index].cNo}` class="button">查看</router-link>-->
              </div>
            </div>
          </el-card>

        </el-col>
      </el-row>
    </div>


  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "card1",
    data() {
      return {
        flag:true,
        currentDate: new Date(),
        info: [],
        imgList: [
          {url: require('../../assets/img/giant1.jpg')},
          {url: require('../../assets/img/giant2.jpg')},
          {url: require('../../assets/img/giant3.jpg')},
          {url: require('../../assets/img/giant4.jpg')},
          {url: require('../../assets/img/giant5.jpg')},
          {url: require('../../assets/img/giant6.jpg')},
          {url: require('../../assets/img/dikanong1.jpg')},
          {url: require('../../assets/img/dikanong2.png')},
          {url: require('../../assets/img/dikanong3.jpg')},
          {url: require('../../assets/img/dikanong4.jpg')},
          {url: require('../../assets/img/dikanong5.jpg')},
          {url: require('../../assets/img/dikanong6.jpg')},
        ],
        cName:'',
      };
    },
    methods: {
      taggle:function () {
        this.flag = ! this.flag
      }
    },
    computed:{
      url(){
        return this.$store.state.url;
      }
    },
    created() {
      let _this = this;
      axios.post(_this.$store.state.url + '/bike/allbike')
        .then(function (response) {
          // console.log(response.data);
          _this.info = response.data.data;
        }).catch(function (error) {
        console.log(error);
      })
    }
  }
</script>

<style scoped>
  .card {
    width: 100%;
  }

  .el-card {
    width: 92%;
    height: 300px;
    margin-top: 5%;
    margin-right: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
  }

  .el-card:hover {
    box-shadow: 2px 2px 2px grey;
    /*!*box-shadow: 0 0 10px gray;*!*/
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    /*float: right;*/
    margin-left: 32%;
    width: 60px;
    height: 30px;
    color: white;
    background-color: olivedrab;
    border: 0!important;
  }

  .button:hover {
    background-color: #459e59;
  }

  .button a {
    color: white;
    text-decoration: none;
  }

  .image {
    width: 86%;
    display: block;
    margin: 0 auto;
  }
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  .box:hover{
    transition: all 0.3s ease 0s;
    transform: scale(0.8);
  }


</style>
