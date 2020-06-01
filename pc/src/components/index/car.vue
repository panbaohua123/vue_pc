<template>
  <div>
    <!--引入头部  -->
    <headera></headera>
    <div class="car">
      <p>我的购物车</p>
      <div class="selectall">
        全选
        <input type="checkbox" v-model="allcb" @change="selectAll" />
      </div>
    </div>
    <!-- 详情 -->
    <div class="car_box" v-for="(item,i) of list" :key="i">
      <div class="car_title">
        <ul>
          <li>商品</li>
          <li>单价</li>
          <li>数量</li>
          <!-- <li>数量</li> -->
          <!-- <li>小计</li> -->
          <li>操作</li>
        </ul>
      </div>
      <div class="detail_box">
        <input type="checkbox" v-model="item.cb" @change="changeitem" />
        <img :src="'http://127.0.0.1:4000/'+item.limg" alt />
        <div class="detail">
          <p>{{item.lname}}</p>
          <p>{{item.price}}</p>      
          <p>
            <button @click="minus">-</button>
            <span>{{n}}</span>
            <button @click="add">+</button>
          </p>
          <p @click="del(item.id)">×</p>
        </div>
      </div>
      <div class="line"></div>
    </div>
    <!-- 结算 -->
    <div class="closes">
      购物车商品数量
      <span style="color:red">{{$store.getters.getCart}}</span>
      <el-button @click="delm">删除选择商品</el-button>
    </div>
    <div class="shop">
      <button class="shop_box" @click="jixu">继续购物</button>
    </div>
    <!-- 实线 -->
    <div class="line"></div>

    <!-- 引入底部 -->
    <footera></footera>
  </div>
</template>

<script>
import headera from "../pc/header";
import footera from "../pc/footer";
export default {
  name: "car",
  components: {
    headera,
    footera
  },
  data() {
    return {
      n: 1,
      list: [], //购物车列表
      allcb: false
    };
  },
  //组件创建成功后调用加载购物车函数
  created() {
    this.loadMore();
  },
  methods: {
    jixu() {
      //继续购物
      this.$router.push("/");
    },
    delm() {
      //删除选中商品
      //当前商品列表中长度为0
      //提示没有可以删除商品
      if (this.list.length == 0) {
        this.$message("当前没有可删除的商品");
        return;
      }
      //拼接商品id字符串
      //创建变量str
      var str = "";
      //创建循环遍历商品,如果商品状态等于true,将id拼接str
      for (var item of this.list) {
        if (item.cb) {
          //选中
          str += item.id + ",";
        }
      }
      //提示:请选择要删除商品
      if (str.length == 0) {
        this.$message("请选择需要删除商品");
        return;
      }
      //截取字符串 ,
      str = str.substring(0, str.length - 1);
      console.log(str);
      //显示确认交互框
      this.$confirm("是否删除数据?")
        .then(res => {
          //创建变量url保存服务器程序地址
          var url = "delm";
          //创建变量obj多个id
          var obj = { id: str };
          //发送ajax请求并且获取返回结果
          this.axios.get(url, { params: obj }).then(res => {
            //重新加载商品列表
            this.loadMore();
            //显示提示信息
            this.$message("删除成功");
          });
        })
        .catch(err => {});
    },
    changeitem() {
      //商品前复选框状态修改函数
      //获取商品列表数组长度
      var size = this.list.length;
      //计算选择状态的商品数量有几个
      var sum = 0;
      for (var item of this.list) {
        //item.cb==true商品选中
        if (item.cb) sum++;
      }
      //如果商品选中数量与数组长度相同 全选 选择不相同 全选清空
      if (size == sum) {
        this.allcb = true;
      } else {
        this.allcb = false;
      }
    },
    selectAll() {
      //购物车全选状态
      //获取全选状态
      var cb = this.allcb;
      //创建循环遍历商品列表将全选状态赋值商品列表项状态
      for (var item of this.list) {
        item.cb = cb;
      }
    },
    //删除购物车
    del(id) {
      //发送请求完成删除商品任务
      //获取购物车商品的id
      //显示一个交互式对话框
      this.$confirm("是否删除指定商品")
        .then(res => {
          //如果用户选择确认
          //创建变量url
          var url = "del";
          //创建变量obj
          var obj = { id };
          //发送请求
          this.axios.get(url, { params: obj }).then(res => {
            //接收服务器返回的数据
            if (res.data.code == 1) {
              //提示删除成功
              this.$message("删除成功");
              //重新加载购物车商品列表
              this.loadMore();
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadMore() {
      //加载购物车列表函数
      //创建变量url请求服务器地址
      var url = "findcart";
      //发送ajax请求,并且获取服务器返回结果
      this.axios.get(url).then(res => {
        //code==-2,请登录
        if (res.data.code == -2) {
          this.$message("请登录");
          this.$router.push("/login");
          return;
        } else {
          //console.log(res);
          //code==1,获取数据保存list
          //this.list = res.data.data;
          //获取服务器返回数据
          var rows = res.data.data;
          //创建循环变量数组中值并添加属性cb商品选中状态
          for (var item of rows) {
            item.cb = false;
          }
          //将新数组赋值list
          this.list = rows;
          //在模板中添加cb属性
          //修改购物车中数量vuex
          this.$store.commit("addmCart", this.list.length);
        }
      });
    },
    minus() {
      this.n--;
      this.n == 0 && (this.n = 1);
    },
    add() {
      this.n++;
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
}
.car_title ul {
  display: flex;
  justify-content: space-around;
  background: #f7f7f7;
}
.car {
  width: 90%;
  margin: 0 auto;
}
.car p {
  color: #561801;
  font-size: large;
  font-weight: bold;
}
.car_title {
  width: 95%;
  margin: 0 auto;
  color: #555;
  height: 36px;
  line-height: 36px;
  font-weight: bold;
}
.detail_box {
  width: 95%;
  margin: 0 auto;
}
.detail p {
  margin-top: -4%;
}
img {
  width: 80px;
  height: 80px;
  margin-top: 15px;
}
.detail {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
/* 实线 */
.line {
  border-bottom: 1px solid #efefef;
  height: 1px;
  margin-top: 20px;
  width: 100%;
}
/* 结算 */
.closes {
  margin-top: 3%;
  text-align: right;
  padding: 0 15px;
}
.closes span {
  font-weight: bold;
  color: #561801;
}
.shop {
  text-align: right;
  margin-top: 2%;
}
.shop_box {
  cursor: pointer;
  width: 160px;
  height: 50px;
  background: #efefef;
  border: 1px solid #ccc;
  font-size: 16px;
  color: #561801;
  font-weight: bold;
  outline-style: none;
}
</style>