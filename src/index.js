import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { counter } from './index.redux';
import AuthRoute from './component/authRoute/AuthRoute.jsx';

import App from './App.jsx';
import Login from './container/login/Login.jsx';
import Register from './container/register/Register.jsx';
import './config.js';

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined;

// 新建store
const store = createStore(
  counter,
  compose(
    applyMiddleware(thunk),
    reduxDevTools
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <AuthRoute></AuthRoute>
        <Route path='/' exact component={App}></Route>
        <Route path='/login' exact component={Login}></Route>
        <Route path='/register' exact component={Register}></Route>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
