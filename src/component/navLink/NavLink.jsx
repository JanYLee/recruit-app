import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

@withRouter
@connect(state => state.chat)
class NavLinkBar extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };
  render() {
    const { data, history, location, unread } = this.props;
    const navList = data.filter(v => !v.hide);
    return (
      <TabBar>
        {navList.map(v => (
          <TabBar.Item
            key={v.path}
            badge={v.path === '/msg'?unread:0}
            title={v.text}
            icon={{ uri: require(`./img/${v.icon}.png`) }}
            selectedIcon={{ uri: require(`./img/${v.icon}-active.png`) }}
            selected={location.pathname === v.path}
            onPress={() => {
              history.push(v.path);
            }}
          ></TabBar.Item>
        ))}
      </TabBar>
    );
  }
}

export default NavLinkBar;
