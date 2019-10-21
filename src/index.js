import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { counter, addCounter, deleteCounter, addCounterAsync } from './index.redux';

import App from './App.jsx';

// 新建store
const store = createStore(counter, applyMiddleware(thunk));

function render() {
  ReactDOM.render(<App store={store} addCounter={addCounter} deleteCounter={deleteCounter} addCounterAsync={addCounterAsync}/>, document.getElementById('root'));
}
render();

// 监听每次修改store
store.subscribe(render);
