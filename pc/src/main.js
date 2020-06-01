import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
//引入轮播组件
import { Carousel, CarouselItem } from "element-ui";
Vue.use(Carousel);

Vue.use(CarouselItem);

Vue.config.productionTip = false;
Vue.use(ElementUI);

axios.defaults.baseURL = "http://localhost:4000/";
//配置session
axios.defaults.withCredentials = true;
Vue.prototype.axios = axios;
//功能配置vuex
//引入vuex
import Vuex from "vuex";
//注册vuex
Vue.use(Vuex);
//创建存储对象
var store = new Vuex.Store({
  //共享数据
  state: { cartCount: 0 }, //共享购物车商品数量
  //修改共享数据
  mutations: {
    //添加多个商品数量
    addmCart(state, n) {
      state.cartCount = n;
    },
    //添加一个商品
    addCart(state) {
      state.cartCount++;
    },
    //减少一个商品
    subCart(state) {
      state.cartCount--;
    },
    //减少多个商品
    sbumCart(state, n) {
      state.cartCount -= n;
    },
    //清空购物车商品数量
    clearCart(state) {
      state.cartCount = 0;
    }
  },
  getters: {
    //获取共享数据
    //获取购物车中商品数量
    getCart(state) {
      return state.cartCount;
    }
  }
});
//将存储对象添加vue
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router, //路由对象
  render: h => h(App),
  store //存储对象
});
