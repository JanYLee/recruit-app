import React, { Component } from 'react';
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile';

import Logo from '../../component/logo/Logo.jsx';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'genuis',// 或者boss
    }
  }
  
  render() {
    const { RadioItem } = Radio;
    const { type } = this.state;
    return (
      <div>
        <Logo />
        <h2>注册</h2>
        <WingBlank>
          <List>
            <InputItem>用户名</InputItem>
            <InputItem>密码</InputItem>
            <InputItem>确认密码</InputItem>
          </List>
          <WhiteSpace />
          <RadioItem checked={type === 'genuis'}>
            求职者
          </RadioItem>
          <RadioItem checked={type === 'boss'}>
            招聘者
          </RadioItem>
          <WhiteSpace />
          <Button type='primary'>注册</Button>
        </WingBlank>
      </div>
    );
  }
}

export default Register;
