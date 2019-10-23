const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const userRouter = require('./user');

const app = express();
app.use(cookieParser()); // 解析cookie
app.use(bodyParser.json()); // 解析post传递过来的参数
app.use('/user', userRouter);

app.listen(9093, function() {
  console.log("node server start at port 9093");
});
