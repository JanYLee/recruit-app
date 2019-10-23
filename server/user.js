const express = require('express');
const Router = express.Router();
const utils = require('utility');

const model = require('./model');
const User = model.getModel('user');

Router.get('/list', function(req, res){
  User.find({}, function(err, doc) {
    return res.json(doc);
  })  
})

Router.post('/register', function(req, res) {
  console.log('data:', req.body);
  const { user, pwd, type } = req.body;
  User.find({ user }, function(err, doc) {
    if(doc.length) {
      return res.json({ code: 1, msg: '用户名重复' });
    }
    User.create({ user, pwd: md5Pwd(pwd), type }, function(err, doc) {
      if(err) {
        return res.json({ code: 1, msg: '后端出错了' });
      }
      return res.json({code: 0});
    })
  })
})

Router.get('/info', function(req, res){
  return res.json({code: 1})
})

module.exports = Router;

function md5Pwd (pwd) {
  const salt = 'jayjotaro';
  return utils.md5(utils.md5(salt+pwd));
}
