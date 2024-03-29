import Axios from 'axios';

import { getRedirectPath } from '../utils';

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT';

const initState = {
  msg: '',
  user: '',
  pwd: '',
  type: '',
  redirectTo: '' // 注册成功后跳转的地址
};

export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        msg: '',
        redirectTo: getRedirectPath(action.payload),
        ...action.payload
      };
    case LOAD_DATA:
      return { ...state, ...action.payload };
    case ERROR_MSG:
      return { ...state, msg: action.msg };
    case LOGOUT:
      return { ...initState, redirectTo: '/login' }
    default:
      return state;
  }
}

function authSuccess(data) {
  return { type: AUTH_SUCCESS, payload: data };
}

function errorMsg(msg) {
  return { msg, type: ERROR_MSG };
}

export function loadData(userinfo) {
  return { type: LOAD_DATA, payload: userinfo };
}

export function logoutSubmit() {
  return { type: LOGOUT };
}

export function update(data) {
  return dispatch => {
    Axios.post('/user/update', data).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}

export function login({ user, pwd }) {
  if (!user || !pwd) return errorMsg('用户名密码必须输入');
  return dispatch => {
    Axios.post('/user/login', { user, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({ ...res.data.data }));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}

export function register({ user, pwd, repeatPwd, type }) {
  if (!user || !pwd || !type) return errorMsg('用户名密码必须输入');
  if (pwd !== repeatPwd) return errorMsg('密码和确认密码不相同');
  return dispatch => {
    Axios.post('/user/register', { user, pwd, type }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({ ...res.data.data }));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}
