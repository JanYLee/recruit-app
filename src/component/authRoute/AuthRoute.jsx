import React, { Component } from 'react';
import axios from 'axios';

class AuthRoute extends Component {
  componentDidMount() {
    // 获取用户信息
    // 是否登录
    // 现在Url地址, login不需要跳转
    // 用户type
    // 用户是否完善信息, 选择头像, 个人简介

    axios.get('/user/info')
      .then(res => {
        if(res.status === 200){
          console.log('res:', res.data);
        }
      })
  }

  render() {
    return (
      <div>
        判断跳转
      </div>
    );
  }
}

export default AuthRoute;
