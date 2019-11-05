import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { NavBar } from 'antd-mobile';

import NavLinkBar from '../navLink/NavLink.jsx';
import Boss from '../boss/Boss.jsx';
import Genius from '../genius/Genius.jsx';
import User from '../user/User.jsx';
import { getMsgList, recvMsg } from '../../redux/chat.redux';

@connect(
  state => state,
  { getMsgList, recvMsg }
)
class Dashboard extends Component {
  componentDidMount() {
    const { chat, getMsgList, recvMsg } = this.props;
    if (!chat.chatmsg.length) {
      getMsgList();
      recvMsg();
    }
  }
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
    const cur = navList.find(i => i.path === pathname);
    return cur ? (
      <div>
        <NavBar mode='dark' className='fixed-header'>
          {cur.title}
        </NavBar>
        <div style={{ marginTop: 45 }}>
          <Switch>
            {navList.map(v => (
              <Route key={v.path} path={v.path} component={v.component} />
            ))}
          </Switch>
        </div>
        <NavLinkBar className='tab-bar-bottom' data={navList}></NavLinkBar>
      </div>
    ) : null;
  }
}

export default Dashboard;
