import Axios from 'axios';

import { getRedirectPath } from '../utils';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';

const initState = {
  isAuth: false,
  msg: '',
  user: '',
  pwd: '',
  type: '',
  redirectTo: '' // 注册成功后跳转的地址
};

export function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        msg: '',
        isAuth: true,
        redirectTo: getRedirectPath(action.payload),
        ...action.payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        msg: '',
        isAuth: true,
        redirectTo: getRedirectPath(action.payload),
        ...action.payload
      };
    case LOAD_DATA:
      return { ...state, isAuth: true, ...action.payload };
    case ERROR_MSG:
      return { ...state, isAuth: false, msg: action.msg };
    default:
      return state;
  }
}

function loginSuccess(data) {
  return { type: LOGIN_SUCCESS, payload: data };
}

function registerSuccess(data) {
  return { type: REGISTER_SUCCESS, payload: data };
}

function errorMsg(msg) {
  return { msg, type: ERROR_MSG };
}

export function loadData (userinfo) {
  return { type: LOAD_DATA, payload: userinfo };
}

export function login({ user, pwd }) {
  if (!user || !pwd) return errorMsg('用户名密码必须输入');
  return dispatch => {
    Axios.post('/user/login', { user, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(loginSuccess({ user, pwd }));
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
        dispatch(registerSuccess({ user, pwd, type }));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}
