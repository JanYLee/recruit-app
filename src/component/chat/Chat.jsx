import React, { Component } from 'react';
import { List, InputItem } from 'antd-mobile';
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
    // socket.on('recvmsg', data => {
    //   this.setState({
    //     msg: [...this.state.msg, data.text]
    //   });
    // });
    this.props.getMsgList();
    this.props.recvMsg();
  }

  handleSubmit() {
    // socket.emit('sendmsg', { text: this.state.text });
    const { user, match, sendMsg } = this.props;
    const from = user._id;
    const to = match.params.user;
    sendMsg({ from, to, msg: this.state.text });
    this.setState({ text: '' });
  }

  render() {
    const { text, msg } = this.state;
    const { chat } = this.props;
    return (
      <div>
        {chat.chatmsg.map(v => (
          <p key={v._id}>{v.content}</p>
        ))}
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
