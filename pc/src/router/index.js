import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import header from "../components/pc/header";
import footer from "../components/pc/footer";
import index from "../components/index/index";
import index_detail from "../components/index/index_detail";
import login from "../components/index/login";
import register from "../components/index/register";
import dangao from "../components/index/dangao";
import dangao_detail from "../components/index/dangao_detail";
import jingpin from "../components/index/jingpin";
import jingpin_detail from "../components/index/jingpin_detail";
import xinpin from "../components/index/xinpin";
import xinpin_detail from "../components/index/xinpin_detail";
import car from "../components/index/car";

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    { path: "/header", component: header },
    { path: "/footer", component: footer },
    { path: "/", component: index },
    { path: "/index_detail", component: index_detail },
    { path: "/login", component: login },
    { path: "/register", component: register },
    { path: "/dangao", component: dangao },
    { path: "/dangao_detail", component: dangao_detail },
    { path: "/jingpin", component: jingpin },
    { path: "/jingpin_detail", component: jingpin_detail },
    { path: "/xinpin", component: xinpin },
    { path: "/xinpin_detail", component: xinpin_detail },
    { path: "/car", component: car }
  ]
});
