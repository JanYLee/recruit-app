const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {
  socket.on('sendmsg', function (data) {
    console.log(data);
    io.emit('recvmsg', data)
  })
})

const userRouter = require('./user');

app.use(cookieParser()); // 解析cookie
app.use(bodyParser.json()); // 解析post传递过来的参数
app.use('/user', userRouter);

server.listen(9093, function() {
  console.log("node server start at port 9093");
});
