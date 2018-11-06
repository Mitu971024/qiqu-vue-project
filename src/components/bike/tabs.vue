<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="el-tabs">
      <el-tab-pane class="details" label="商品详情" name="first" style="">
        <div class="d-one" v-for="item in info1">
          <div>品牌名称：Giant/捷安特</div>
          <div>产品参数：</div>
          <ul>
            <li>货号:{{item.cpayNumber}}</li>
            <li>制动系统: {{item.cSystem}}</li>
            <li>车架类型:{{item.cPmodel}}</li>
            <li>前叉类型:{{item.cPname}}</li>
            <li>车架材质:{{item.cPfeatures}}</li>
            <li>轮径尺寸:{{item.cPsize}}</li>
            <li>速别:{{item.size}}</li>
          </ul>
          <span>不支持</span> 售中未使用退款
          <span>支持</span> 过期自动退款（退款比例：90%）
        </div>
        <div class="d-two" v-for="(cImg,index) in cImg1" :key="index">
          <img :src="cImg">
        </div>
      </el-tab-pane>
      <el-tab-pane label="评价" name="second">
        <div class="evaluate">
          <div class="head">
            <div class="block">
              <span class="demonstration"></span>
              <el-rate
                v-model="value2"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
              </el-rate>
              满意度
            </div>
            <div class="line"></div>
            <div class="b-one">
              听说评论的人更优秀！
              <img src="../../assets/img/face1.gif" style="width: 45px;height: 45px;">
            </div>
          </div>
          <div class="e-two">
            <el-input type="textarea"
                      :rows="4"
                      placeholder="请发表评论"
                      v-model="textareadata">
            </el-input>
          </div>
          <div class="e-three">
            <button  @click="addinfo" >发表</button>
          </div>
          <div id="e-four">
            <div id="">
              <h4 color="blue">优秀评论</h4>
            </div>
            <div class="eva" v-for="item in info">
              <div>
                <p class="e3">
                  <img class="img1" :src="url1 + item.mImg"/>
                </p>
                <p class="e1" style="color: green">
                  {{ item.mName}}:
                </p>
                <p class="e2" style="text-indent:2em;">
                  {{ item.eContent}}
                </p>
                <div id="h">
                  <span>评论时间：{{item.etime}} </span>
                  <!--<img src="../../assets/img/闹钟.png">-->
                </div>
              </div>
              <div class="s">
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "tabs",
    // inject: ['reload'],
    data() {
      return {
        info: [],
        textareadata: '',
        info1: [],
        activeName: 'second',
        eTime: '',
        cImg1: [],
        url1: '',
        value2: null,
      }
    },
    computed: {
      index() {
        return this.$store.state.index;
      },
      url() {
        return this.$store.state.url;
      }
    },
    created() {
      let _this = this;
      axios.post(_this.$store.state.url + '/bike/details/showevaluate', {cNo: _this.$route.params.cNo})
        .then(function (response) {
          console.log(response.data);
          _this.info = response.data.data;
          _this.url1 = _this.$store.state.url
        }).catch(function (error) {
        console.log(error);
      });
      axios.post(_this.$store.state.url + '/bike/details', {cNo: _this.$route.params.cNo})
        .then(function (response) {
          console.log(response.data);
          _this.info1 = response.data.data;
          console.log('aaa');
          console.log(_this.info1[0]);
          _this.cImg1 = _this.info1[0].cImg.split(',');
        }).catch(function (error) {
        console.log(error);
      });
    },
    methods: {
      addinfo() {
        let _this = this;
        if (this.$store.state.index == 1) {
          if (_this.textareadata) {
            axios.post(`${_this.$store.state.url}/bike/details/addevalute`,
              {
                eContent: _this.textareadata,
                mId: window.localStorage.mId,
                cNo: _this.$route.params.cNo,
                etime: _this.eTime,
              }).then(function (result) {
              console.log(result.data);
              console.log(_this.eTime)
              // this.reload()
            });
            // this.reload()
            _this.$message({
              showClose: true,
              message: '评论成功!',
              type: 'success'
            });
            this.textareadata = null
          } else {
            _this.$message({
              showClose: true,
              message: '评论不能为空!',
              type: 'success'
            });
          }
        }
        if (this.$store.state.index != 1) {
          _this.$router.push({path: '/login'})
        }
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },

    }
  }
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }

  .el-tabs {
    width: 80%;
    margin-left: 10%;
    margin-top: 1%;
  }

  /**********商品详情*********/
  .tabs {
    width: 80%;
    margin-left: 10%;
    /*border: 1px solid gainsboro;*/
    margin-top: 50px;
    height: 3300px;
  }

  .details {
    /*border: 1px solid gainsboro;*/
    padding: 0;
    text-align: left;
    /*height: 3230px;*/
  }

  .d-one {
    width: 80%;
    margin-left: 3%;
    color: grey;
    margin-top: 20px;
    height: 200px;
  }

  .d-one div {
    height: 36px;
  }

  ul {
    height: 70px;
  }

  ul li {
    list-style: none;
    float: left;
    width: 200px;
  }

  /*************************/
  .d-two {
    height: 492px;
    margin-left: 3%;
  }

  /**********商品评价*******/
  .evaluate {

  }
  .head{
    margin-top: 2%;
  }
  .block {
    float: left;
    margin-left: 3%;
    margin-top: 1%;
  }

  .b-one {
    float: right;
    margin-right: 55%;
  }

  .line {
    margin-right:5%;
    height: 40px;
    border-right: 1px dashed grey;
    display: inline-block;
  }

  .e-two {
    width: 80%;
    margin-left: 3%;
    margin-top: 3%;
  }

  button {
    width:75px;
    height: 44px;
    margin-left:56%;
    font-size: 14px;
    background-color: #68c82a;
    color: white;
    border:0;

  }
  h4{
    margin-top: 5%;
    margin-left: -15%;

  }
  .eva {
    width: 1200px;
    height: 100px;
  }

  .e3{
    text-align: left;
  }
  .eva .img1 {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 3%;
    margin-top: 2%;
  }

  .e1 {
    text-align: left;
    margin-left: 8%;
    font-weight: bolder;
    margin-top: -30px;
  }
  .e2{
    text-align: left;
    margin-left: 11%;
    margin-top: -20px;

  }

  #h {
    text-align: right;
    margin-right: 37%;
    margin-top: -18px;
  }

  .s {
    border-bottom: 1px #b5b7b3 dashed;
    width: 80%;
    margin-top: 15px;
  }
</style>
