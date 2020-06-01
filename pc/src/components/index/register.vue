<template>
  <div>
    <!-- 引入头部 -->
    <headera></headera>
    <!-- 登陆 -->
    <div class="register">
      <div class="register_box">
        <h1>用户注册</h1>
        <div>
          <input type="text" placeholder="请输入用户名" v-model="uname" @blur="zhuce" />
        </div>
        <div>
          <input type="password" placeholder="请输入密码" v-model="upwd" />
        </div>
        <div>
          <input type="password" placeholder="确认密码" v-model="upwd1" />
        </div>
        <div class="register1">
          <el-checkbox>我已看过并接受《用户协议》</el-checkbox>
          <router-link to="/login">我有账号立即登录</router-link>
        </div>
        <button @click="register">立即注册</button>
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
  name: "register",
  components: {
    headera,
    footera
  },
  data() {
    return {
      // chekced:true,
      uname: "", //双向绑定
      upwd: "", //用户名和密码
      upwd1: "" //确认密码
    };
  },
  methods: {
    zhuce() {
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
        this.uname = "";
        return;
      }
      //2.获取用户名和密码
      var url = "zhuce";
      var u = this.uname;
      var obj = { uname: u };
      this.axios.get(url, { params: obj }).then(res => {
        if (res.data.code == 3) {
          this.$confirm("该用户已被注册过", {
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
        } else {
          this.$confirm("用户名可用", {
            confirmButtonText: "确认",
            cancelButtonText: "取消"
          })
            .then(() => {
              this.$message({
                message: "确认"
              });
            })
            .catch(() => {
              this.$message({
                message: "已取消删除"
              });
            });
        }
      });
    },

    //完成用于注册验证
    register() {
      //创建正则表达式
      var reg = /^[a-z0-9]{3,12}$/i;
      //获取用户名和密码
      var u = this.uname;
      var p = this.upwd;
      var c = this.upwd1;
      //验证用户名格式不正确,提示格式错误
      // if(!reg.test(u)){
      //      this.$confirm("用户名格式不正确",{
      //              confirmButtonText:"确定",
      //            cancelButtonText:"取消",
      //         }).then(()=>{
      //              this.$message({
      //                  message:"删除成功"
      //              });
      //          }).catch(()=>{
      //              this.$message({
      //                 message:"已取消删除"
      //             })
      //         })
      //         this.uname=""
      //         return;
      //     }
      //验证密码格式,如果不正确,提示密码错误
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
        this.upwd = "";
        return;
      }
      if (!reg.test(p) || c !== p) {
        this.$confirm("两次密码格式不一致", {
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
        this.upwd1 = "";
        return;
      }
      //创建url请求服务器地址
      var url = "register";
      //创建obj请求时数据
      var obj = { uname: u, upwd: p };
      //发送ajax请求
      this.axios.get(url, { params: obj }).then(res => {
        //获取服务器返回信息
        if (res.data.code == 1) {
          this.$confirm("注册成功", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          })
            .then(() => {
              this.$message({
                message: "确认"
              });
            })
            .catch(() => {
              this.$message({
                message: "已取消删除"
              });
            });
          this.$router.push("/login");
        }
      });
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
}
.el-checkbox {
  color: #561801;
  margin: 10px 30px;
}
.register_box {
  width: 400px;
  margin: 0 auto;
}

.register_box h1 {
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
  width: 350px;
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
.register1 a {
  color: #561801;
  font-size: 12px;
}
button {
  width: 350px;
  height: 50px;
  background: #551700;
  border-radius: 3px;
  margin: 10px 30px;
  color: #fff;
  outline-style: none;
  border: 1px solid #551700;
}
</style>