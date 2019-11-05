import React, { Component } from 'react';
import { List, InputItem, NavBar, Icon } from 'antd-mobile';
import { connect } from 'react-redux';

import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux';
import { getChatId } from '../../utils';

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg }
)
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '', msg: [] };
  }

  componentDidMount() {
    const { chat, getMsgList, recvMsg } = this.props;
    if (!chat.chatmsg.length) {
      getMsgList();
      recvMsg();
    }
  }

  handleSubmit() {
    const { user, match, sendMsg } = this.props;
    const from = user._id;
    const to = match.params.user;
    sendMsg({ from, to, msg: this.state.text });
    this.setState({ text: '' });
  }

  render() {
    const { text, msg } = this.state;
    const { chat, match, history, user } = this.props;
    const userid = match.params.user;
    const chatmsgs = chat.chatmsg.filter(
      v => v.chatid === getChatId(userid, user._id)
    );
    if (!chat.users[userid]) return null;
    return (
      <div id='chat-page'>
        <NavBar
          mode='dark'
          icon={<Icon type='left'></Icon>}
          onLeftClick={() => history.goBack()}
        >
          {chat.users[userid].name}
        </NavBar>
        {chatmsgs.map(v => {
          const avatar = require(`../img/${chat.users[v.from].avatar}.jpg`);
          return v.from === userid ? (
            <List key={v._id}>
              <List.Item thumb={avatar}>{v.content}</List.Item>
            </List>
          ) : (
            <List key={v._id}>
              <List.Item
                extra={<img src={avatar} alt='avatar' />}
                className='chat-me'
              >
                {v.content}
              </List.Item>
            </List>
          );
        })}
        <div className='stick-footer'>
          <List>
            <InputItem
              placeholder='请输入'
              value={text}
              onChange={v => this.setState({ text: v })}
              extra={<span onClick={() => this.handleSubmit()}>发送</span>}
            >
              信息
            </InputItem>
          </List>
        </div>
      </div>
    );
  }
}

export default Chat;
