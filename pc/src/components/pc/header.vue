<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <img src="../../assets/logo.jpg" alt />
      <div>
        <ul>
          <li>
            <router-link to="/">首页</router-link>
          </li>
          <li>
            <router-link to="/dangao">蛋糕名录</router-link>
          </li>
          <li>
            <router-link to="jingpin">精品推荐</router-link>
          </li>
          <li>
            <router-link to="xinpin">新品上市</router-link>
          </li>
        </ul>
      </div>
      <!-- 登陆注册 -->
      <div class="login">
        <router-link to="/login">
          登陆
          <span>|</span>
        </router-link>
        <router-link to="/register">
          注册
          <!-- <span>|</span> -->
        </router-link>
        <!-- <a href>
          <img src="../../assets/05.png" />0
        </a>-->
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
}
ul {
  list-style: none;
}
.header {
  display: flex;
  width: 1170px;
  margin: 2% 10%;
}
.header img {
  width: 160px;
  height: 80px;
}
div {
  width: 100%;
}
div ul {
  display: flex;
  justify-content: space-around;
}
div ul li a {
  display: inline-block;
  margin-top: 30px;
  color: #561801;
  font-size: 14px;
}
.login {
  position: absolute;
  left: 75%;
  /* top:2%; */
}
.login a {
  color: #561801;
  font-size: 14px;
}
.login a img {
  width: 30px;
  height: 20px;
}
span {
  margin: 0 14px;
}
</style>
    