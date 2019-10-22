// 链接mongo, 并使用recruit_app这个集合
const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1:27017/recruit_app';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function() {
  console.log('mongodb connect success');
})

// User.create({
//   user: 'dio',
//   age: 18
// }, function(err, doc) {
//   console.log(err?err:doc);
// })

// User.update({'user': 'jotaro'}, {'$set': {age: 20}}, function(err, doc) {
//   console.log(err?err:doc);
// })

// User.remove({age: 18}, function(err, doc) {
//   console.log(err?err:doc);
// })

const User = mongoose.model('user', new mongoose.Schema({
  user: {type: String, required: true},
  age: {type: Number, required: true}
}))
