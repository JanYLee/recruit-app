import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace, Modal } from 'antd-mobile';
import browserCookies from 'browser-cookies';
import { Redirect } from 'react-router-dom';

import { logoutSubmit } from '../../redux/user.redux';

@connect(
  state => state.user,
  { logoutSubmit }
)
class User extends Component {
  logout = () => {
    const alert = Modal.alert;
    alert('注销', '确认退出登录吗?', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确认',
        onPress: () => {
          browserCookies.erase('userid');
          this.props.logoutSubmit();
        }
      }
    ]);
  };
  render() {
    const {
      avatar,
      user,
      title,
      type,
      company,
      money,
      desc,
      redirectTo
    } = this.props;
    return user ? (
      <div>
        {redirectTo && redirectTo !== '/login' ? (
          <Redirect to={redirectTo}></Redirect>
        ) : null}
        <Result
          img={
            <img
              src={require(`../img/${avatar}.jpg`)}
              alt='avatar'
              style={{ width: 50 }}
            ></img>
          }
          title={user}
          message={type === 'boss' ? company : null}
        />
        <List renderHeader={() => '简介'}>
          <List.Item multipleLine>
            {title}
            {desc.split('\n').map(v => (
              <List.Item.Brief key={v}>{v}</List.Item.Brief>
            ))}
            {money ? <List.Item.Brief>薪资: {money}</List.Item.Brief> : null}
          </List.Item>
        </List>
        <WhiteSpace />
        <List>
          <List.Item onClick={this.logout}>注销</List.Item>
        </List>
      </div>
    ) : (
      <Redirect to={redirectTo}></Redirect>
    );
  }
}

export default User;
