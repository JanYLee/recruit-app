import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadData } from '../../redux/user.redux';

@withRouter
@connect(
  state => state.user,
  { loadData }
)
class AuthRoute extends Component {
  componentDidMount() {
    // 获取用户信息
    // 是否登录
    // 现在Url地址, login不需要跳转
    // 用户type
    // 用户是否完善信息, 选择头像, 个人简介
    const publicList = ['/login', '/register'];
    const { location, history, loadData } = this.props;
    const { pathname } = location;
    // 判断当前路由是否已经在登录或注册页, 已经在则不用获取用户信息
    if (publicList.includes(pathname)) return;
    axios.get('/user/info').then(res => {
      if (res.status === 200) {
        if (res.data.code === 0) {
          loadData(res.data.data);
        } else {
          history.push('/login');
        }
      }
    });
  }

  render() {
    return null;
  }
}

export default AuthRoute;
