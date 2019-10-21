
const ADD_COUNTER = 'add';
const DELETE_COUNTER = 'delete';

// 新建store
// 通过reducer生成
// 根据老的state和action 生成新的state
export function counter(state = 0, action) {
  switch (action.type) {
    case ADD_COUNTER:
      return state + 1;
    case DELETE_COUNTER:
      return state - 1;
    default:
      return 10;
  }
}

// actionCreater
export function addCounter() {
  return { type: ADD_COUNTER };
}

export function deleteCounter() {
  return { type: DELETE_COUNTER };
}

