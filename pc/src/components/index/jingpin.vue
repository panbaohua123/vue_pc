<template>
  <div>
    <!-- 引入头部 -->
    <headera></headera>
    <!-- 详情 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>蛋糕名录</el-breadcrumb-item>
      <el-breadcrumb-item>精品推荐</el-breadcrumb-item>
    </el-breadcrumb>
    <!--实线 -->
    <div class="line"></div>
    <!-- 图片 -->
    <div class="box" v-for="(item,i) of list" :key="i">
      <div class="box1" @click="to(i+1)">
        <ul>
          <li>
            <img :src="'http://127.0.0.1:4000/'+item.img" alt />
          </li>
          <li class="box2">
            <a href="javascript:;" style="color:#561801;padding:0 25px;">{{item.title}}</a>
            <p>{{item.title1}}</p>
            <p>{{item.title2}}</p>
          </li>
          <li class="price">¥{{item.price}}</li>
          <li class="btn">
            <el-button type="info" plain>{{item.btn}}</el-button>
            <el-button
              type="info"
              @click="addcart(item.id,item.img,item.title,item.price)"
            >{{item.btn1}}</el-button>
          </li>
        </ul>
      </div>
      <!--实线 -->
      <div class="line"></div>
    </div>
    <!-- 返回顶部 -->
    <div id="nav" @click="returnTop">
      <img src="../../assets/12.png" alt />
    </div>
    <!-- 引入底部 -->
    <footera></footera>
  </div>
</template>
<script>
import headera from "../pc/header.vue";
import footera from "../pc/footer.vue";

var scrollTop = 0;
window.onscroll = function() {
  scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  //当页面滚动过的距离>=500时就让div#toTop显示出来
  if (scrollTop >= 500) {
    nav.style.display = "block";
  } else {
    //否则如果页面滚动过的距离<500时就让div#toTop隐藏起来
    nav.style.display = "none";
  }
};
export default {
  name: "jingpin",
  components: {
    headera,
    footera
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    //生命周期,组件创建成功
    this.loadMore();
  },
  methods: {
    // 返回顶部
    returnTop() {
      // 首先获得页面上方滚动超出的距离
      scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      // 返回顶部
      // window.scrollTo(0,0);-----直接立即回到顶部
      // 制作动画过渡效果
      // 首先获得总距离  总步数  总时间(ms)
      var dist = scrollTop;
      var steps = 100;
      var dura = 800;
      // 获得每步走多长距离  每步间隔(速率 > 10是定时器最优状态)
      var step = dist / steps;
      var interval = dura / steps;
      // 设置定时器
      var timer = setInterval(function() {
        // 经过 timer后走多长距离
        window.scrollBy(0, -step);
        steps--;
        // 当总的步数减完时,清除定时器,并更新总步数=100;
        if (steps == 0) {
          clearInterval(timer);
          steps = 100;
        }
      }, interval);
    },
    //购物车
    addcart(id, img, title, price) {
      //console.log(id + "_" + title + "_" + price, 111);
      //console.log(id + "_" + img + "_" + title + "_" + price);
      //创建变量url请求服务器程序
      var url = "addcart";
      //创建变量obj请求服务器程序参数
      var obj = { id, img, title, price };
      //3:发送ajax请求
      this.axios.get(url, { params: obj }).then(res => {
        // 接收服务器返回结果
        // 提示请登录 跳转登录组件
        if (res.data.code == -2) {
          this.$message("请登录");
          this.$router.push("/Login");
        } else {
          this.$message("添加成功");
        }
        // 添加成功
        this.$router.push("/car");
      });
    },
    //获取详情页数据
    to(did) {
      this.$router.push({
        path: "/jingpin_detail",
        query: { id: did }
      });
    },
    loadMore() {
      //加载商品列表
      //创建url变量,请求服务器
      var url = "jingpin";
      //发送请求
      this.axios.get("jingpin").then(res => {
        this.list = res.data;
      });
    }
  }
};
</script>

<style scoped>
/* 详情文字 */
.el-breadcrumb {
  font-size: 16px;
  line-height: 1;
  margin: 0 auto;
  width: 1170px;
  margin-top: 20px;
}
.line {
  border-bottom: 1px solid #efefef;
  height: 1px;
  margin-top: 20px;
  margin-left: 8%;
  width: 1300px;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
.box {
  width: 100%;
}
.box1 {
  width: 1300px;
  margin: 0 auto;
  margin-top: -10px;
  position: relative;
}
.box2 {
  width: 550px;
  height: 36px;
  line-height: 22px;
  font-size: 14px;
}
p {
  margin: 5px 25px 2px;
  color: #999;
}
.box1 ul {
  display: flex;
}
.box img {
  width: 160px;
  height: 130px;
}
.price {
  position: absolute;
  top: 45%;
  left: 65%;
  color: #561801;
}
.btn {
  position: absolute;
  top: 35%;
  left: 78%;
}
#nav {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 80%;
  right: 50px;
}
</style>