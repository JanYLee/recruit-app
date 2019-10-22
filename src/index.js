import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Link, Switch, Redirect, useParams } from 'react-router-dom';

import { counter } from './index.redux';

import App from './App.jsx';

const reduxDevTools = window.devToolsExtension
  ? window.devToolsExtension()
  : f => f;
// 新建store
const store = createStore(
  counter,
  compose(
    applyMiddleware(thunk),
    reduxDevTools
  )
);

function Secend () {
  return <h2>第二个组件</h2>
}

function Third () {
  return <h2>第三个组件</h2>
}

function Test (props) {
  console.log(props);
  const { location } = useParams();
  return <h2>测试组件, 手动获取:{props.match.params.location}, useParams的api获取: {location}</h2>;
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to='/'>root</Link>
          </li>
          <li>
            <Link to='/second'>二组件</Link>
          </li>
          <li>
            <Link to='/third'>三组件</Link>
          </li>
          <li>
            <Link to='/old-match'>重定向到二组件</Link>
          </li>
        </ul>
        <Switch>
          <Route path='/' exact component={App}></Route>
          <Route path='/second' component={Secend}></Route>
          <Route path='/third' component={Third}></Route>
          <Route path="/old-match">
            <Redirect to="/second" />
          </Route>
          <Route path='/:location' component={Test}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
