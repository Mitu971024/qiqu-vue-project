<template>
  <div>
    <div class="shop">
      <div class="head"></div>
      <div class="shopping">
        <h3>确认订单</h3>
        <img class="ding" src="../../assets/img/订单.png">
        <hr>
        <div class="upload">
          <p>添加收货地址</p>
          <el-button type="text" @click="dialogFormVisible = true " color="black">
            <div class="di"><img src="../../assets/img/添加地址.png"></div>
          </el-button>
          <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rule">
              <el-form-item label="收货地址" :label-width="formLabelWidth">
                <span class="addre"><v-distpicker @selected="onSelected"></v-distpicker></span>
                <!--<el-input v-model="form.address" autocomplete="off" placeholder="请输入收货地址"></el-input>-->
              </el-form-item>
              <el-form-item label="收件人" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name" placeholder="请输入收件人姓名">
                </el-input>
              </el-form-item>
              <el-form-item label="手机号码" :label-width="formLabelWidth" prop="phonenumber">
                <el-input v-model="form.phonenumber" placeholder="请输入手机号">
                </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addExp">确 定</el-button>
            </div>
          </el-dialog>
          <div>
            <button @click="showHid" style="background-color: orange;border:0;color: white;height:30px;margin-bottom: 1%">查看收货地址</button>
          </div>
        </div>
        <transition enter-active-class="bounceIn" leave-active-class="bounceOut" :duration="{ enter: 200, leave: 400 }">
          <div class="hid" v-if="show">
            <p>收件人姓名：{{exp[0].sName}}</p>
            <p>收件人地址：{{exp[0].sAddress}}</p>
            <p>收件人电话号码：{{exp[0].sphoneNumber}}</p>
          </div>
        </transition>
        <div class="s-one">
          <ul>
            <li>商品详情</li>
            <li>单价(元)</li>
            <li>数量</li>
            <li>小计</li>
          </ul>
        </div>
      </div>
      <div class="s-two" v-for="item in goods">
       <span class="s2"><img :src="item.cBigimg.split(',')[0]" class="s1">
            {{item.cIntr}}
      </span>
        <span class="s3">￥{{item.cPrice}}</span>
        <span class="s3">{{item.number}}</span>
        <span class="s4">&nbsp;&nbsp;{{item.number*item.cPrice}}</span>
      </div>
      <div class="s5">
      </div>
      <div class="s-three">
        <span>配送方式：快递免邮</span>
        <span>合计：{{total}}</span>&nbsp;
        <router-link to="/submit">
          <button @click="addOrder()">
            提交订单
          </button>
        </router-link>
      </div>
      <router-view></router-view>
    </div>
    <app-foot class="foot"></app-foot>
  </div>
</template>

<script>

  import axios from 'axios'
  import Foot from '../Foot'

  export default {
    name: "confirm",
    data() {
      let  phonenum = (rule, value, callback) => {
        let pattern = /^1[34578]\d{9}$/
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else if(!pattern.test(value)){
          callback(new Error('请输入正确的手机号'))
        }else{
          callback()
        }
      };
      let Name = (rule, value, callback) => {
        let pattern =  /^([\u2E80-\u9FFF]){2,5}$/g
        if (value === '') {
          callback(new Error('请输入姓名'));
        } else if (!pattern.test(value)) {
          callback(new Error('请输入2-5个汉字'))
        } else {
          callback()
        }
      };
      return {
        num: '',
        show: false,
        goods: [],
        exp: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
        address:'',
        form: {
          phonenumber: '',
          address: '',
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          otime: ''
        },
        formLabelWidth: '120px',
        rule:{
          phonenumber: [
            { validator: phonenum, trigger: 'blur' }
          ],
          name: [
            { validator: Name, trigger: 'blur' }
          ],
        }
      }

    },
    components: {
      'app-foot': Foot,
    },
    computed: {
      total() {
        let total = 0;
        for (let i = 0; i < this.goods.length; i++) {
          total += this.goods[i].number * this.goods[i].cPrice;
        }
        return total;
      },
      url() {
        return this.$store.state.url;
      }
    },
    methods: {
      onSelected(data) {
        this.address= data.province.value+data.city.value+data.area.value;
        // console.log(this.address)
      },
      addExp: function () {
        if(this.form.name && this.address && this.from.phonenumber){
          let _this = this;
          axios.post(_this.$store.state.url + '/order/addexp', {
              sName: _this.form.name,
              sAddress: _this.address,
              sphoneNumber: _this.form.phonenumber,
              mId: window.localStorage.mId,
            }
          ).then(function (response) {
            // console.log(response.data);
          })
          alert("添加成功");
          _this.sName = null
          _this.sAddress = null
          _this.sphoneNumber = null
          // _this.showHid()
        }else {
          this.$message({
            showClose: true,
            message: '请填写完整!',
            type: 'info'
          });
        }
      },
      showHid: function () {
        this.show = !this.show;
        // setTimeout(function() {
        let _this = this
        axios.post(_this.$store.state.url + '/order/showexp').then(function (response) {
          // console.log(response.data);
          _this.exp = response.data.data;
        }).catch(function (error) {
          console.log(error);
        })
        // },500)
      },
      addOrder: function () {
        let _this = this;
        const goods = this.$store.state.checkgood;
        for (let i = 0; i < _this.goods.length; i++) {
          axios.post(_this.$store.state.url + '/order/addorder', {
            cNo: goods[i].cNo,
            oNum: goods[i].number,
            oName: goods[i].cIntr,
            oPrice: goods[i].cPrice,
            oImg: goods[i].cBigimg,
            mId: goods[i].mId,
          }).then(function (response) {
            // console.log(response.data);
          })
        }
      }
    },
    created() {
      let _this = this
      _this.goods = this.$store.state.checkgood;
    }


  }

</script>

<style scoped>
  .foot{margin-top: 50px;}
  .upload p{
    margin: 0;
    padding: 0;
  }
  .shop {
    padding-bottom: 20px;
  }

  .head {
    margin-top: 2%;
    text-align: center;
    width: 100%;
    height: 40px;
    background: #ff6441;
    background-image: repeating-linear-gradient(45deg, hsla(0, 0%, 100%, .1), hsla(0, 0%, 100%, .1) 15px, #ff6441 0, #ff6227 30px);

  }

  .ding {
    width: 50px;
    height: 50px;
    float: left;
    margin-left: 26%;
    margin-top: -5%;
  }

  .shopping {
    /*border: 1px solid #1aa9ff;*/
    width: 80%;
    /*margin-top: 3%;*/
    margin-left: 10%;
  }

  .shopping ul {
    margin-left: 6%;
  }

  .shopping ul li {
    list-style: none;
    float: left;
    width: 188px;
  }

  h3 {
    margin-left: -60%;
  }

  hr {
    background-color: #ff9a48;
    height: 1px;
    border: none;
    width: 80%;
  }

  .s-one {
    height: 30px;
  }

  .s-two {
    /*border-top:1px solid grey;*/
    width: 60%;
    margin-left: 12%;
  }

  .s-two img {

    height: 60px;
    width: 60px;
  }

  .s-two span {
    /*width: 70px;*/
    margin-left: 16%;
  }

  #num {
    width: 40px;
  }

  .s-three {
    margin-left: 38%;
    /*margin-top: 10%;*/
  }

  .s-three button {
    border: none;
    background-color: #ff9a48;
    width: 120px;
    height: 40px;
    color: white;
  }

  .s5 {
    text-align: left;
    margin-left: 23%;
    margin-top: 2%;
  }

  .upload {
    margin-left: -60%;

  }

  .upload img {
    width: 60px;
    height: 60px;
  }

  .hid {
    /*height: 200px;*/
    width: 280px;
    padding-top: 1%;
    line-height: 20px;
    /*align-items: center;*/
    text-align:left ;
    border: 1px dashed #cecece;
    /*clear: left;*/
    margin-left: 32%;
    float: left;
    margin-top: -160px;
    /*display: none;*/
  }

  .hid p {
    /*margin-top: 12%;*/
  }

  .di {
    border: 1px solid grey;
    width: 100px;
    height: 100px;
    float: left;
  }

  .di img {
    margin-top: 15px;
  }

  .distpicker-address-wrapper select {
    font-size: 20px !important;
  }

  .addre {
    /*padding-left: 2%;*/
    text-align: left;
    font-size: 16px !important;
  }
</style>

