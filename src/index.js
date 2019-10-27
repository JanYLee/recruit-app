import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import reducer from './reducer';
import AuthRoute from './component/authRoute/AuthRoute.jsx';

import Login from './container/login/Login.jsx';
import Register from './container/register/Register.jsx';
import BossInfo from './container/bossInfo/BossInfo.jsx';
import GeniusInfo from './container/geniusInfo/GeniusInfo.jsx';
import Dashboard from './component/dashboard/Dashboard.jsx';
import './config.js';
import './index.css';

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : undefined;

// 新建store
const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    reduxDevTools
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthRoute></AuthRoute>
      <Switch>
        <Route path='/bossinfo' exact component={BossInfo}></Route>
        <Route path='/geniusinfo' exact component={GeniusInfo}></Route>
        <Route path='/login' exact component={Login}></Route>
        <Route path='/register' exact component={Register}></Route>
        <Route component={Dashboard}></Route>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
