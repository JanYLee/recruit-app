import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace, Modal } from 'antd-mobile';
import browserCookies from 'browser-cookies';

@connect(state => state.user)
class User extends Component {
  logout = () => {
    const alert = Modal.alert;
    alert('注销', '确认退出登录吗?', [
      {text: '取消', onPress: () => console.log('cancel')},
      {text: '确认', onPress: () => {
        browserCookies.erase('userid');
        window.location.href = window.location.href;
      }}
    ])
  }
  render() {
    const { avatar, user, title, type, company, money, desc } = this.props;
    return user ? (
      <div>
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
            {money ? <List.Item.Brief >薪资: {money}</List.Item.Brief>:null}
          </List.Item>
        </List>
        <WhiteSpace />
        <List>
          <List.Item onClick={this.logout}>注销</List.Item>
        </List>
      </div>
    ) : null;
  }
}

export default User;
