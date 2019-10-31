// 链接mongo, 并使用recruit_app这个集合
const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1:27017/recruit_app';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function() {
  console.log('mongodb connect success');
});

const models = {
  user: {
    user: { type: String, require: true },
    pwd: { type: String, require: true },
    type: { type: String, require: true },
    avatar: { type: String }, // 头像
    desc: { type: String }, // 简介
    title: { type: String }, // 职位
    // 下面是招聘者才有的属性
    company: { type: String },
    money: { type: String }
  },
  chat: {
    chatid: { type: String, require: true }, // 每个聊天唯一标识
    from: { type: String, require: true },
    to: { type: String, require: true },
    read: { type: Boolean, default: false }, // 已读标识
    content: { type: String, require: true, default: '' },
    create_time: { type: Number, default: new Date().getTime() }
  }
};

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
  getModel: name => mongoose.model(name)
};
