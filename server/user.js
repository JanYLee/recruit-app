const express = require('express');
const Router = express.Router();
const utils = require('utility');

const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');
const _filter = { pwd: 0, __v: 0 }; // 去除数据库返回中多余显示

Router.get('/list', function(req, res) {
  const { type } = req.query;
  // Chat.remove({}, (e, d) => {});
  User.find({ type }, function(err, doc) {
    return res.json({ code: 0, data: doc });
  });
});

Router.post('/login', function(req, res) {
  const { user, pwd } = req.body;
  User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, function(err, doc) {
    if (!doc) {
      return res.json({ code: 1, msg: '用户名或密码错误' });
    }
    res.cookie('userid', doc._id);
    return res.json({ code: 0, data: doc });
  });
});

Router.post('/register', function(req, res) {
  const { user, pwd, type } = req.body;
  User.find({ user }, function(err, doc) {
    if (doc.length) {
      return res.json({ code: 1, msg: '用户名重复' });
    }
    const userModel = new User({ user, pwd: md5Pwd(pwd), type });
    userModel.save(function(err, doc) {
      if (err) {
        return res.json({ code: 1, msg: '后端出错了' });
      }
      const { user, type, _id } = doc;
      res.cookie('userid', doc._id);
      return res.json({ code: 0, data: { user, type, _id } });
    });
  });
});

Router.get('/info', function(req, res) {
  const { userid } = req.cookies;
  if (!userid) return res.json({ code: 1 });

  User.findOne({ _id: userid }, _filter, function(err, doc) {
    if (err) {
      return res.json({ code: 1, msg: '后端出错了' });
    }
    if (doc) {
      return res.json({ code: 0, data: doc });
    }
  });
});

Router.post('/update', function(req, res) {
  const { userid } = req.cookies;
  if (!userid) return res.json({ code: 1 });
  const body = req.body;
  User.findByIdAndUpdate(userid, body, function(err, doc) {
    if (err) {
      return res.json({ code: 1, msg: '后端出错了' });
    }
    const data = Object.assign(
      {},
      {
        user: doc.user,
        type: doc.type
      },
      body
    );
    return res.json({ code: 0, data });
  });
});

Router.get('/getmsglist', function(req, res) {
  const user = req.cookies.userid;
  let users = {};
  User.find({}, function(err, doc) {
    doc.forEach(v => {
      users[v._id] = { name: v.user, avatar: v.avatar };
    });
  });
  const filter = { $or: [{ from: user }, { to: user }] };
  Chat.find(filter, function(err, doc) {
    if (!err) {
      return res.json({ code: 0, msgs: doc, users });
    }
  });
});

Router.post('/readmsg', function(req, res) {
  const userid = req.cookies.userid;
  const { from } = req.body;
  Chat.update(
    { from, to: userid },
    { $set: { read: true } },
    { multi: true },
    function(err, doc) {
      if (!err) {
        return res.json({ code: 0, num: doc.nModified });
      }
      return res.json({ code: 1, msg: '修改失败' });
    }
  );
});

module.exports = Router;

function md5Pwd(pwd) {
  const salt = 'jayjotaro';
  return utils.md5(utils.md5(salt + pwd));
}
