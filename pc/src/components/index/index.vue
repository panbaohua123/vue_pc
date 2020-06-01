<template>
    <div>
<!-- 引入头部 -->
<headera></headera>
<!-- 轮播图 -->
 <el-carousel :interval="2000" type="card" trigger="click" height="300px">
    <el-carousel-item>
        <img src="../../assets/01.jpg"/>
    </el-carousel-item>
<el-carousel-item>
    <img src="../../assets/02.jpg" />
</el-carousel-item>
    <el-carousel-item>
        <img src="../../assets/03.jpg"/>
    </el-carousel-item>
    <el-carousel-item>
    <img src="../../assets/04.jpg"/>
    </el-carousel-item>
</el-carousel>
<!-- 详情图片 -->
<div class="detail_box1">
    <div class="detail_boxx">
        <div class="detail_box" v-for="(item,i) of list" :key="i" >
            <div class="detail" @click="to(i+1)">
                 <ul>
                    <li> <img :src="'http://127.0.0.1:4000/'+item.img" alt="">
                        <a href="javascript:;"><p>{{item.title}}</p><p class="money">¥{{item.title1}}</p><img :src="'http://127.0.0.1:4000/'+item.img1" alt=""></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<!-- 底部说明 -->
<div class="foot_box">   
  <img src="../../../../vue_server_00/public/09.jpg" alt="">
</div>
<!-- 引入底部 -->
<footera></footera>
    </div>
</template>
<script>
import headera from '../pc/header.vue'
import footera from '../pc/footer.vue'

    export default {
        name: 'index',
        components:{
            headera,
            footera,
        },
        data(){
            return {
                list:[],
            }
        },
        created(){
        //生命周期:组建创建成功
        this.loadMore();
        },
        methods:{
            to(did){
                this.$router.push({
                path:'/index_detail',
                query:{id:did}
                })
            },
            loadMore(){
        //加载商品列表
        //创建变量url请求服务器程序
        var url="index";
        //发送请求
        this.axios.get('index').then(res=>{
            this.list=res.data;
        }) 
            }
     }
        
   
}
</script>

<style scoped>
/* 轮播图片 */
img{
    width:100%;
    height:400px;
}
/* 详情 */
ul{
    list-style:none;   
}
a{
    text-decoration:none;
    position: relative;
    margin-top:-85px;
    display: none;
    width: 200px;
    height: 66px;
    background: #000;
    opacity: 0.5;
}

.detail_box .detail ul li:hover a{
    display: block;
    cursor:pointer;
}
p{
    font-size: 15px;
    color: #fff;
    padding: 5px 3px 5px 8px;
}
.money{
    margin-top:-10%;
}
.detail_box1{
    background:#f7f7f7;
}
.detail_boxx{
    display:flex;
    margin:0 auto;
    width:1170px;
    justify-content: space-around;
    flex-wrap: wrap; 
}
 .detail_box1 .detail_boxx .detail a img{
    width: 50px;
    height: 50px;
    background-size: 40px;
    position: absolute;
    left:73%;
    top: 12%;
}
.detail img{
    width:200px;
    height:180px;
}
/* 底部文字 */
.foot_box img{
    width:100%;
    height:180px;
}
</style>