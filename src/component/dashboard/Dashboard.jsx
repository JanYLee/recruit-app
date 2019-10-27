import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import NavLinkBar from '../navLink/NavLink.jsx';

function Boss() {
  return <h1>Boss页</h1>;
}

@connect(state => state)
class Dashboard extends Component {
  render() {
    const { user, location } = this.props;
    const { pathname } = location;
    const navList = [
      {
        path: '/boss',
        text: '应聘者',
        icon: 'boss',
        title: '候选人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: '招聘者',
        icon: 'genius',
        title: '招聘者列表',
        component: Boss,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Boss
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: Boss
      }
    ];
    return (
      <div>
        <NavBar mode='dark'>
          {navList.find(i => i.path === pathname).title}
        </NavBar>
        {/* <Router></Router> */}
        <NavLinkBar classname='Am-TabBar' data={navList}></NavLinkBar>
      </div>
    );
  }
}

export default Dashboard;
