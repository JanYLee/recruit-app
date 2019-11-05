import Axios from 'axios';
import io from 'socket.io-client';

const socket = io('ws://localhost:9093');

const MSG_LIST = 'MSG_LIST'; // 获取聊天列表
const MSG_RECV = 'MSG_RECV'; // 读取信息
const MSG_READ = 'MSG_READ'; // 标识已读

const initState = {
  chatmsg: [],
  users: {},
  unread: 0
};

export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      const { msgs, users, userid } = action.payload;
      return {
        ...state,
        users,
        chatmsg: msgs,
        unread: msgs.filter(v => !v.read && v.to === userid).length
      };
    case MSG_RECV:
      const n = action.payload.msg.to === action.payload.userid ? 1 : 0;
      return {
        ...state,
        chatmsg: [...state.chatmsg, action.payload.msg],
        unread: state.unread + n
      };
    case MSG_READ:
      break;

    default:
      return state;
  }
}

function msgList(msgs, users, userid) {
  return { type: MSG_LIST, payload: { msgs, users, userid } };
}

function msgRecv(msg, userid) {
  return { type: MSG_RECV, payload: { msg, userid } };
}

export function getMsgList() {
  return (dispatch, getState) => {
    Axios.get('/user/getmsglist').then(res => {
      const userid = getState().user._id;
      if (res.status === 200 && res.data.code === 0) {
        dispatch(msgList(res.data.msgs, res.data.users, userid));
      }
    });
  };
}

export function sendMsg({ from, to, msg }) {
  return dispatch => {
    socket.emit('sendmsg', { from, to, msg });
  };
}

export function recvMsg() {
  return (dispatch, getState) => {
    socket.on('recvmsg', function(data) {
      const userid = getState().user._id;
      dispatch(msgRecv(data, userid));
    });
  };
}
