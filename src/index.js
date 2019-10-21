import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { counter, addCounter, deleteCounter, addCounterAsync } from './index.redux';

import App from './App.jsx';

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined;
// 新建store
const store = createStore(counter, compose(applyMiddleware(thunk), reduxDevTools));

function render() {
  ReactDOM.render(<App store={store} addCounter={addCounter} deleteCounter={deleteCounter} addCounterAsync={addCounterAsync}/>, document.getElementById('root'));
}
render();

// 监听每次修改store
store.subscribe(render);
