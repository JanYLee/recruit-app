import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile';

import { register } from '../../redux/user.redux';
import Logo from '../../component/logo/Logo.jsx';

@connect(
  state => state.user,
  { register }
)
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pwd: '',
      repeatPwd: '',
      type: 'genuis',// 或者boss
    };
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  handleRegister() {
    this.props.register(this.state)
    console.log('this.state :', this.state);
  }
  
  render() {
    const { RadioItem } = Radio;
    const { msg, redirectTo } = this.props;
    const { type } = this.state;
    return (
      <div>
        {redirectTo ? <Redirect to={redirectTo}></Redirect> : null}
        <Logo />
        <h2>注册</h2>
        <WingBlank>
          <List>
            {msg ? <p className='Error-Msg'>{msg}</p>:null}
            <InputItem
              onChange={v => this.handleChange('user', v)}
            >用户名</InputItem>
            <InputItem
              type='password'
              onChange={v => this.handleChange('pwd', v)}
            >密码</InputItem>
            <InputItem
              type='password'
              onChange={v => this.handleChange('repeatPwd', v)}
            >确认密码</InputItem>
          </List>
          <WhiteSpace />
          <RadioItem
            checked={type === 'genuis'}
            onClick={v => this.handleChange('type', 'genuis')}
          >
            求职者
          </RadioItem>
          <RadioItem 
            checked={type === 'boss'}
            onClick={v => this.handleChange('type', 'boss')}
          >
            招聘者
          </RadioItem>
          <WhiteSpace />
          <Button onClick={this.handleRegister} type='primary'>注册</Button>
        </WingBlank>
      </div>
    );
  }
}

export default Register;
