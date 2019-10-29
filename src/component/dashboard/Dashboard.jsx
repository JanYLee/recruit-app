import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { NavBar } from 'antd-mobile';

import NavLinkBar from '../navLink/NavLink.jsx';
import Boss from '../boss/Boss.jsx';
import Genius from '../genius/Genius.jsx';
import User from '../user/User.jsx';

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
        component: Genius,
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
        component: User
      }
    ];
    return (
      <div>
        <NavBar mode='dark' className='fixed-header'>
          {navList.find(i => i.path === pathname).title}
        </NavBar>
        <div style={{marginTop: 45}}>
          <Switch>
            {navList.map(v => (
              <Route key={v.path} path={v.path} component={v.component} />
            ))}
          </Switch>
        </div>
        <NavLinkBar className='tab-bar-bottom' data={navList}></NavLinkBar>
      </div>
    );
  }
}

export default Dashboard;
