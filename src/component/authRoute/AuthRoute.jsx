import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

@withRouter
class AuthRoute extends Component {
  componentDidMount() {
    // 获取用户信息
    // 是否登录
    // 现在Url地址, login不需要跳转
    // 用户type
    // 用户是否完善信息, 选择头像, 个人简介
    const publicList = ['/login', '/register'];
    const { location, history } = this.props;
    const { pathname } = location;
    // 判断当前路由是否已经在登录或注册页, 已经在则不用获取用户信息
    if(publicList.includes(pathname)) return;
    axios.get('/user/info')
      .then(res => {
        if(res.status === 200){
          console.log('res:', res.data);
          if(res.data.code === 0) {

          } else {
            history.push('/login');
            console.log(history)
          }
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
