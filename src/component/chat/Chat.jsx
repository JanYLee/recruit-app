import React, { Component } from 'react';
import { List, InputItem, NavBar } from 'antd-mobile';
import { connect } from 'react-redux';

import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux';

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
    this.props.getMsgList();
    this.props.recvMsg();
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
    const { chat, match } = this.props;
    return (
      <div id='chat-page'>
        <NavBar mode='dark'>{match.params.user}</NavBar>
        {chat.chatmsg.map(v => {
          return v.from === match.params.user ? (
            <List key={v._id}>
              <List.Item>{v.content}</List.Item>
            </List>
          ) : (
            <List key={v._id}>
              <List.Item extra={'avatar'} className='chat-me'>
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
