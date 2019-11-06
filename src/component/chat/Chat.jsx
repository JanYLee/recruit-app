import React, { Component } from 'react';
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';
import { connect } from 'react-redux';

import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux';
import { getChatId } from '../../utils';

const emoji = '😀 😁 😂 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 ☺ 😇 😐 😑 😶 😏 😣 😥 😮 😯 😪 😫 😴 😌 😛 😜 😝 😒 😓 😔 😕 😲 😷 😖 😞 😟 😤 😢 😭 😦 😧 😨 😬 😰 😱 😳 😵 😡 😠'
  .split(' ')
  .filter(v => v)
  .map(v => ({ text: v }));

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg, readMsg }
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


    // 用于修复Grid组件固定4行产生的bug
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

  componentWillUnmount() {
    // 离开时标记已读
    const { readMsg, match } = this.props;
    const to = match.params.user;
    readMsg(to);
  }

  fixCarousel() {
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

  handleSubmit() {
    const { user, match, sendMsg } = this.props;
    const from = user._id;
    const to = match.params.user;
    sendMsg({ from, to, msg: this.state.text });
    this.setState({ text: '' });
  }

  render() {
    const { text, shouldEmoji } = this.state;
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
              extra={
                <div>
                  <span
                    style={{ marginRight: 15 }}
                    role='img'
                    onClick={() => {
                      this.setState({ shouldEmoji: !shouldEmoji });
                      this.fixCarousel()
                    }}
                  >
                    <span></span>😀
                  </span>
                  <span onClick={() => this.handleSubmit()}>发送</span>
                </div>
              }
            >
              信息
            </InputItem>
          </List>
          {shouldEmoji ? (
            <Grid
              data={emoji}
              columnNum={9}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={e => {
                this.setState({
                  text: this.state.text + e.text
                })
              }}
            ></Grid>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Chat;
