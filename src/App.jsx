import React from 'react';
import { connect } from 'react-redux';

import { addCounter, deleteCounter, addCounterAsync } from './index.redux';

export default function App(props) {
  const { num, addCounter, deleteCounter, addCounterAsync } = props;
  return(
    <div>
      <h1>Counter</h1>
      <p>现在的计数器: {num}</p>
      <button onClick={addCounter}>新增计数</button>
      <button onClick={addCounterAsync}>新增计数(延迟1秒)</button>
      <button onClick={deleteCounter}>减少计数</button>
    </div>
  )
}

const mapStatetoProps = (state) => {
  return { num: state };
}

const actionCreators = { addCounter, deleteCounter, addCounterAsync }

App = connect(mapStatetoProps, actionCreators)(App);
