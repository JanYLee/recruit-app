import React, { Component } from 'react';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';

import Logo from '../../component/logo/Logo.jsx';

class Login extends Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
  }
  
  register() {
    this.props.history.push('/register');
  }

  render() {
    return (
      <div>
        <Logo />
        <h2>登录</h2>
        <WingBlank>
          <List>
            <InputItem>用户</InputItem>
            <InputItem>密码</InputItem>
          </List>
          <WhiteSpace />
          <Button type='primary'>登录</Button>
          <WhiteSpace />
          <Button onClick={this.register} type='primary'>注册</Button>
        </WingBlank>
      </div>
    );
  }
}

export default Login;
