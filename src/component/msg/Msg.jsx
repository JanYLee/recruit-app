import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';

@connect(state => state)
class Msg extends Component {
  getLast(arr) {
    return arr[arr.length - 1];
  }

  render() {
    // 根据聊天用户分组
    const { chat, user } = this.props;
    const msgGroup = {};
    chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || [];
      msgGroup[v.chatid].push(v);
    });
    const chatList = Object.values(msgGroup);
    return (
      <div>
        {chatList.map(v => {
          const lastItem = this.getLast(v);
          const targetId = v[0].from === user._id ? v[0].to : v[0].from;
          if (!targetId) return null;
          const unreadNum = v.filter(v => !v.read && v.to === user._id).length;
          return (
            <List>
              <List.Item
                key={lastItem._id}
                extra={<Badge text={unreadNum} />}
                thumb={require(`../img/${chat.users[targetId].avatar}.jpg`)}
              >
                {lastItem.content}
                <List.Item.Brief>{chat.users[targetId].name}</List.Item.Brief>
              </List.Item>
            </List>
          );
        })}
      </div>
    );
  }
}

export default Msg;
