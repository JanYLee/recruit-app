import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import { counter, addCounter, deleteCounter } from './index.redux';

import App from './App.jsx';

// 新建store
const store = createStore(counter);

function render() {
  ReactDOM.render(<App store={store} addCounter={addCounter} deleteCounter={deleteCounter}/>, document.getElementById('root'));
}
render();

// 监听每次修改store
store.subscribe(render);
