import React from 'react';
import { connect } from 'react-redux';

import { addCounter, deleteCounter, addCounterAsync } from './index.redux';

@connect(
  state => ({num: state}), 
  { addCounter, deleteCounter, addCounterAsync }
)
class App extends React.Component {

  render() {
    const { num, addCounter, deleteCounter, addCounterAsync } = this.props;
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
}

export default App;
