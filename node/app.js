const Koa = require("koa")
const app = new Koa()
const bodyParser = require("koa-bodyparser")
const router = require("koa-router")();
const mongoose = require("mongoose");
// 解决跨域
const koaCors = require("koa-cors");
// 连接数据库
mongoose.connect('mongodb://localhost/sales', function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("数据库连接成功的哈~");
    }
});
// 引入路由
const index = require("./routes/index");
// 使用中间件
//跨域中间件
app.use(koaCors());
app.use(bodyParser())
router.use(index.routes())
app.use(router.routes())
    // 监听窗口
app.listen(8086);
