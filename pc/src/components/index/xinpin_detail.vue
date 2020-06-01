<template>
  <div>
    <!--引入头部  -->
    <headera></headera>
    <!--实线 -->
    <div class="line"></div>
    <!-- 详情 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>蛋糕名录</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/jingpin' }">精品推荐</el-breadcrumb-item>
      <el-breadcrumb-item>美之旋律</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 左侧详情图片 -->
    <div class="detail_box" v-for="(item,i) of list" :key="i">
      <div class="detail">
        <div class="detail_box1">
          <img :src="'http://127.0.0.1:4000/'+item.img" alt />
        </div>
        <div class="right">
          <ul>
            <li style="color:#561801;font-weight:bold ;padding:0 0 10px">{{item.title}}</li>
            <li style="color:#999">{{item.title1}}</li>
            <li style="border-bottom:1px solid #efefefmargin-top:5px"></li>
            <li>
              <select v-model="price" class="inp">
                <option value="价格:298">{{item.title3}}</option>
                <option value="价格:398">{{item.title4}}</option>
                <option value="价格:498">{{item.title5}}</option>
                <option value="价格:598">{{item.title6}}</option>
              </select>
            </li>
            <li style="color:#561801;">
              <span>{{price}}</span>
            </li>
            <!-- <li style="color:#561801;line-height:50px">价格:<span>¥{{item.price}}元</span></li>
                  <li><span class="inp">{{item.title3}}</span><span class="inp">{{item.title4}}</span></li>
            <li><span class="inp">{{item.title5}}</span><span class="inp">{{item.title6}}</span></li>-->
            <el-input-number
              v-model="num"
              controls-position="right"
              @change="handleChange"
              :min="1"
              :max="30"
            ></el-input-number>
            <li>
              <button @click="addcart(item.id,item.img,item.title,item.price)">立即购买</button>
              <button @click="addcart(item.id,item.img,item.title,item.price)">加入购物车</button>
            </li>
          </ul>
        </div>
      </div>
      <div class="detail_img">
        <ul>
          <li>
            <a href="javascript:;">
              <img :src="'http://127.0.0.1:4000/'+item.img1" alt />
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <img :src="'http://127.0.0.1:4000/'+item.img2" alt />
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <img :src="'http://127.0.0.1:4000/'+item.img3" alt />
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <img :src="'http://127.0.0.1:4000/'+item.img4" alt />
            </a>
          </li>
        </ul>
      </div>
      <div class="img1">
        <img :src="'http://127.0.0.1:4000/'+item.img5" alt />
      </div>
    </div>
    <!-- 引入底部 -->
    <footera></footera>
  </div>
</template>

<script>
import headera from "../pc/header";
import footera from "../pc/footer";
export default {
  name: "xinpin_detail",
  components: {
    headera,
    footera
  },
  data() {
    return {
      num: 1,
      list: [],
      price: "价格:298"
    };
  },
  created() {
    //生命周期,组件创建成功
    this.loadMore();
  },
  methods: {
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
    loadMore() {
      var url = "xinpin_detail";
      this.id = this.$route.query.id;
      this.axios.get(url, { params: { id: this.id } }).then(res => {
        this.list = res.data;
      });
    },
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>

<style scoped>
/* 实线 */
.line {
  border-bottom: 1px solid #efefef;
  height: 1px;
  margin-top: -19px;
}
/* 详情文字 */
.el-breadcrumb {
  font-size: 16px;
  line-height: 1;
  margin: 0 auto;
  width: 1170px;
  margin-top: 20px;
}
/* 图片 */
a {
  text-decoration: none;
}
ul {
  list-style: none;
}
.detail_box {
  margin-top: 20px;
  width: 100%;
}
.detail_box1 img {
  width: 550px;
  height: 450px;
}
.detail {
  width: 1170px;
  margin: 0 auto;
  display: flex;
}
.detail_img ul {
  width: 500px;
  display: flex;
  justify-content: space-around;
  margin-left: 7.5%;
}
.detail_img a img {
  width: 77px;
  height: 65px;
}
.detail_img a {
  border: #efefef 1px solid;
  display: inline-block;
  padding: 10px;
}
.detail_img ul li:hover a {
  border: #630 1px solid;
}
/* 右侧文字 */
.right {
  margin-left: 20%;
}
.inp {
  border: 1px solid red;
  width: 140px;
  display: inline-block;
  padding: 3px 8px;
  background: #fff;
  border: #ccc solid 1px;
  margin: 8px 10px 10px 0px;
  cursor: pointer;
  color: #561801;
  font-size: 12px;
  line-height: 30px;
}
.img1 {
  width: 1170px;
  margin-left: 6%;
}
.img1 img {
  height: 600px;
  margin: 0 auto;
}
button {
  width: 160px;
  height: 50px;
  background: #551700;
  border: #663300 solid 1px;
  color: #fff;
  font-size: 16px;
  margin: 20px 10px 10px 0px;
  outline: none;
}
</style>