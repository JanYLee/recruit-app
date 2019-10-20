const express = require('express');
const mongoose = require('mongoose');

// 链接mongo, 并使用recruit_app这个集合
const DB_URL = 'mongodb://127.0.0.1:27017/recruit_app';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function() {
  console.log('mongodb connect success');
})

const User = mongoose.model('user', new mongoose.Schema({
  user: {type: String, required: true},
  age: {type: Number, required: true}
}))
// User.create({
//   user: 'dio',
//   age: 18
// }, function(err, doc) {
//   console.log(err?err:doc);
// })

User.update({'user': 'jotaro'}, {'$set': {age: 20}}, function(err, doc) {
  console.log(err?err:doc);
})

// User.remove({age: 18}, function(err, doc) {
//   console.log(err?err:doc);
// })

const app = express();

app.get("/", function(req, res) {
  res.send("<h1>hello world</h1>");
});

app.get("/data", function(req, res) {
  // res.json({ name: "jay", type: "singer" });
  User.find({}, function (err, doc) {
    res.json(doc);
  })
});

app.listen(9093, function() {
  console.log("node server start at port 9093");
});
