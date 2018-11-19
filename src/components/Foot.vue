<template>
  <div class="container-fluid bg-1">
    <div class="row">
      <nav class="navbar navbar-inverse">
        <div class="container-fluid">
          <div class="collapse navbar-collapse marginT row">
            <div class="col-xs-4 col-xs-offset-4 s1">
              <ul class="nav navbar-nav">
                <router-link tag="li" role="presentation" to="/" exact><a>网站首页</a></router-link>
                <router-link tag="li" role="presentation" to="/" exact><a>关于我们</a></router-link>
                <router-link tag="li" role="presentation" to="/" exact><a>意见反馈</a></router-link>
                <router-link tag="li" role="presentation" to="/" exact><a>友情链接</a></router-link>
              </ul>
            </div>

          </div>
          <div class="row">
            <div class="col-xs-3 col-xs-offset-4">
              <p class="Pcolor">&copy;&nbsp;&nbsp;2018&nbsp;&nbsp;骑趣</p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Foot"
  }
</script>

<style scoped>
  nav{border: 0}
  .bg-1{background-color: rgb(69,69,69);color: white;}
  .navbar{
    margin-bottom: 0;
    height: 100px;
    background-color: rgb(69,69,69);
  }
  .s1{
    margin-left: 550px;
  }
  .Pcolor{color: #9d9d9d;margin-left: 125px;}
  .marginT{margin-top: 25px;}
</style>

