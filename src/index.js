import { createStore } from 'redux';

// 新建store
// 通过reducer生成
// 根据老的state和action 生成新的state
function counter (state=0, action) {
  switch(action.type) {
    case 'add':
      return state+1;
    case 'delete':
      return state-1;
    default:
      return 10;
  }
}

// 新建store
const store = createStore(counter);

const init = store.getState();
console.log('init :', init); // init : 10

function listener() {
  const curStore = store.getState();
  console.log(`now store is ${curStore}`);
}

// 监听每次修改store
store.subscribe(listener);

// 派发事件 传递action
store.dispatch({type: 'add'}); // now store is 11
store.dispatch({type: 'add'}); // now store is 12
store.dispatch({type: 'delete'}); // now store is 11
