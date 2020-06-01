//app.js 服务器端程序
//1:下载第三方模块
//  express express-session
//  mysql cors
//  示例
//  npm i express express-session mysql cors 回车
//2:引入第三方模块
//web服务器
const express = require("express");
//session对象
const session = require("express-session");
//mysql驱动
const mysql = require("mysql");
//跨域
const cors = require("cors");
//3:创建数据库连接池
var pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "pc",
  port: 3306,
  connectionLimit: 15,
});
//4:配置跨域模块:允许脚手架访问服务器
var server = express();
server.use(
  cors({
    //允许:脚手架访问服务器
    origin: ["http://127.0.0.1:8080", "http://localhost:8080"],
    //每次请求加验证
    credentials: true,
  })
);
//5:配置session !!!
//6:创建服务器对象
//6.1:配置静态目录
server.use(express.static("public"));
//6.2:配置session对象
server.use(
  session({
    secret: "128位安全字符串", //加密条件
    resave: true, //请求更新数据
    saveUninitialized: true, //保存初始数据
  })
);
//7:为服务器对象绑定端口 4000
server.listen(4000);

//功能一:用户登录验证
server.get("/login", (req, res) => {
  //(1)获取用户名和密码
  var u = req.query.uname;
  var p = req.query.upwd;
  //(2)创建sql
  var sql = "SELECT id FROM login WHERE uname=? AND upwd=?";
  //(3)返回结果
  pool.query(sql, [u, p], (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      res.send({ code: -1, msg: "用户名或密码有误" });
    } else {
      //  将当前登录用户id保存
      //  session对象中作为登录成功凭证
      //  -获取当前用户id
      result = [{ id: 1 }];
      var uid = result[0].id;
      //  -保存session对象中
      req.session.uid = uid;
      console.log(req.session);
      res.send({ code: 1, msg: "登录成功" });
    }
  });
});
//功能一:用户注册验证
server.get("/register", (req, res) => {
  //(1)获取用户名和密码
  var u = req.query.uname;
  var p = req.query.upwd;
  //(2)创建sql
  var sql = "INSERT INTO login values(null,?,?)";
  //(3)返回结果
  pool.query(sql, [u, p], (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      res.send({ code: -1, msg: "注册失败" });
    } else {
      //  将当前登录用户id保存
      //  session对象中作为注册成功凭证
      //  -获取当前用户id
      //  result=[{id:1}]
      var uid = result.insertid;
      //  -保存session对象中
      req.session.uid = uid;
      console.log(req.session);
      res.send({ code: 1, msg: "注册成功" });
    }
  });
});
// 验证用户名是否被注册
server.get("/zhuce", (req, res) => {
  // 创建用户名
  var u = req.query.uname;
  // 创建sql语句
  var sql = "SELECT * FROM login WHERE uname=?";
  // 返回结果
  pool.query(sql, [u], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send({ code: 3, msg: "用户名已经被注册" });
      this.uname = "";
    } else {
      res.send({ code: 1, msg: "用户名可用" });
    }
  });
});
//验证
//1:启动 mysql
//2:启动 node app.js
//3:打开浏览器在地址栏输入
// http://127.0.0.1:4000/login?uname=1&upwd=1
// http://127.0.0.1:4000/login?uname=panbaohua&upwd=123456

// 显示商品首页列表
server.get("/index", (req, res) => {
  var sql = "SELECT * FROM index_detail";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// http://127.0.0.1:4000/index

//显示商品首页详情列表
server.get("/index_detail", (req, res) => {
  var id = req.query.id;
  var sql = "SELECT * FROM index_xiangqing WHERE id=?";
  //console.log(sql)
  pool.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// http://127.0.0.1:4000/index_detail

// 显示蛋糕页列表
server.get("/dangao", (req, res) => {
  var sql = "SELECT * FROM dangao_detail";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// http://127.0.0.1:4000/dangao

//显示蛋糕详情页列表
server.get("/dangao_detail", (req, res) => {
  var id = req.query.id;
  var sql = "SELECT * FROM dangao_xiangqing WHERE id=?";
  pool.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// http://127.0.0.1:4000/dangao_detail

// 获取精品推荐列表
server.get("/jingpin", (req, res) => {
  var sql = "SELECT * FROM jingpin_detail";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// http://127.0.0.1:4000/jingpin

//获取精品列表推荐详情页
server.get("/jingpin_detail", (req, res) => {
  var id = req.query.id;
  var sql = "SELECT * FROM jingpin_xiangqing WHERE id=?";
  pool.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// http://127.0.0.1:4000/jingpin_detail

//获取新品上市列表
server.get("/xinpin", (req, res) => {
  var sql = "SELECT * FROM xinpin_detail";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// http://127.0.0.1:4000/xinpin

//获取新品上市详情页列表
server.get("/xinpin_detail", (req, res) => {
  var id = req.query.id;
  var sql = "SELECT * FROM xinpin_xiangqing WHERE id=?";
  pool.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//蛋糕页面购物车:将商品添加至购物车
server.get("/addcart", (req, res) => {
  //1:获取当前登录用户凭证
  var uid = req.session.uid;
  //2:如果当前用户没有登录 请登录
  if (!uid) {
    res.send({ code: -2, msg: "请登录" });
    return;
  }
  //3:获取脚手架传递参数
  var lid = req.query.id;
  var limg = req.query.img;
  var lname = req.query.title;
  var price = req.query.price;
  var count = 1;
  // console.log(req.query);
  //4:创建查询sql语句
  //  当前用户是否购买过此商品
  var sql = "SELECT id FROM shop_cart WHERE uid = ? AND lid=?";
  //5:执行sql语句
  pool.query(sql, [uid, lid], (err, result) => {
    if (err) throw err;
    //6:判断如果没有购买过此商品添加
    if (result.length == 0) {
      var sql = `insert into shop_cart values(null,${lid},'${limg}','${lname}',${price},${count},${uid})`;
    } else {
      var sql = `UPDATE shop_cart SET count=count+1 WHERE uid=${uid} AND lid=${lid}`;
    }
    //7:如果己购买过此商品更新数量
    //8:执行sql
    pool.query(sql, (err, result) => {
      if (err) throw err;
      res.send({ code: 1, msg: "添加成功" });
    });
  });
});

//查询购物车信息
server.get("/findcart", (req, res) => {
  //获取用户登陆凭证uid
  var uid = req.session.uid;
  //没有uid请登录
  if (!uid) {
    res.send({ code: -2, msg: "请登录", data: [] });
    return;
  }
  //创建sql语句
  var sql = "SELECT id,lid,limg,lname,price,count FROM shop_cart WHERE uid=?";
  //发送sql语句
  pool.query(sql, [uid], (err, result) => {
    if (err) throw err;
    res.send({ code: 1, msg: "查询成功", data: result });
  });
  //将服务器返回结果,发送脚手架
});

//删除一条购物车数据
server.get("/del", (req, res) => {
  //判断用户是否登录
  var uid = req.session.uid;
  if (!uid) {
    res.send({ code: -2, msg: "请登录" });
    return;
  }
  //参数
  var id = req.query.id;
  //sql
  var sql = "DELETE FROM shop_cart WHERE id=?";
  //json
  pool.query(sql, [id], (err, result) => {
    if (err) throw err;
    //受影响的行数
    if (result.affectedRows > 0) {
      res.send({ code: 1, msg: "删除成功" });
    } else {
      res.send({ code: -1, msg: "删除失败" });
    }
  });
});

//删除选中商品
//清空购物车
server.get("/delm", (req, res) => {
  //判断是否登录
  var uid = req.session.uid;
  if (!uid) {
    res.send({ code: -2, msg: "请登录" });
    return;
  }
  //参数
  var id = req.query.id;
  //sql
  var sql = `DELETE FROM shop_cart WHERE id IN (${id})`;
  //json
  pool.query(sql, (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.send({ code: 1, msg: "删除成功" });
    } else {
      res.send({ code: -1, msg: "删除失败" });
    }
  });
});
