<template>
  <div>
    <!-- 引入头部 -->
    <headera></headera>
    <!-- 登陆 -->
    <div class="log">
      <div class="login_box">
        <h1>用户登陆</h1>
        <div>
          <input type="text" placeholder="请输入用户名" v-model="uname" @blur="log" />
        </div>
        <div>
          <input type="password" placeholder="请输入密码" v-model="upwd" />
        </div>
        <div class="register">
          <router-link to="/register">立即注册</router-link>
        </div>
        <button @click="login">登陆</button>
      </div>
    </div>
    <!-- 引入底部 -->
    <footera></footera>
  </div>
</template>
<script>
import headera from "../pc/header.vue";
import footera from "../pc/footer.vue";
export default {
  name: "login",
  components: {
    headera,
    footera
  },
  data() {
    return {
      uname: "", //双向绑定
      upwd: "" //用户名和密码
    };
  },
  methods: {
    login() {
      //完成用户登陆验证方法
      //1.创建正则表达式
      var reg = /^[a-z0-9]{3,12}$/i;
      //2.获取用户名和密码
      var u = this.uname;
      var p = this.upwd;
      //3.1 验证用户名如果格式不正确提示格式错误
      if (!reg.test(u)) {
        this.$confirm("用户名格式不正确", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(() => {
            this.$message({
              message: "删除成功"
            });
          })
          .catch(() => {
            this.$message({
              message: "已取消删除"
            });
          });
        this.uname = "";
        return;
      }
      //3.2密码验证,如果格式不正确,提示密码格式错误
      if (!reg.test(p)) {
        this.$confirm("密码格式不正确", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(() => {
            this.$message({
              message: "删除成功"
            });
          })
          .catch(() => {
            this.$message({
              message: "已取消删除"
            });
          });
      }
      //4.创建url请求服务器地址
      var url = "login";
      //5.创建obj请求时数据
      var obj = { uname: u, upwd: p };
      //6.发送ajax请求
      this.axios.get(url, { params: obj }).then(res => {
        //7.获取服务器返回信息,返回-1,提示错误
        if (res.data.code == -1) {
          this.$confirm("用户名或密码有误", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          })
            .then(() => {
              this.$message({
                message: "删除成功"
              });
            })
            .catch(() => {
              this.$message({
                message: "已取消删除"
              });
            });
          this.uname = "";
          this.upwd = "";
          return;
        } else {
          this.$message("登陆成功");
        }
        //8.跳转商品列表组件/index
        this.$router.push("/");
      });
    },
    log() {
      var u = this.uname;
      //用户登陆验证长度方法
      var reg = /^[a-z0-9]{3,12}$/i;
      if (!reg.test(u)) {
        this.$confirm("用户名必须是3-12位数字或字母", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(() => {
            this.$message({
              message: "删除成功"
            });
          })
          .catch(() => {
            this.$message({
              message: "已取消删除"
            });
          });
      }
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
}
.login_box {
  width: 400px;
  margin: 0 auto;
}

.login_box h1 {
  height: 40px;
  line-height: 40px;
  font-weight: bold;
  text-align: center;
  background: url(../../assets/11.jpg) no-repeat 120px center;
  background-size: 45px;
  color: #561801;
  font-size: 15px;
}
input {
  width: 300px;
  height: 36px;
  line-height: 36px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin: 10px 30px;
}
::-webkit-input-placeholder {
  font-weight: small;
  padding: 0 10px;
  font-size: 14px;
}
a {
  text-decoration: none;
}
.register a {
  color: #561801;
  font-size: 12px;
  width: 120px;
  margin: 10px 30px;
}
button {
  width: 300px;
  height: 50px;
  background: #551700;
  border-radius: 3px;
  margin: 10px 30px;
  color: #fff;
  outline-style: none;
  border: 1px solid #551700;
}
</style>