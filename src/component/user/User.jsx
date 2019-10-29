import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace } from 'antd-mobile';

@connect(state => state.user)
class User extends Component {
  render() {
    console.log(this.props);
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
          <List.Item>注销</List.Item>
        </List>
      </div>
    ) : null;
  }
}

export default User;
