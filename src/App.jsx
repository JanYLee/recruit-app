import React, { Component } from 'react';

export default class App extends Component {
  render() {
    const { store, addCounter, deleteCounter } = this.props;
    const num = store.getState();
    return(
      <div>
        <h1>Counter</h1>
        <p>现在的计数器: {num}</p>
        <button onClick={() => store.dispatch(addCounter())}>新增计数</button>
        <button onClick={() => store.dispatch(deleteCounter())}>减少计数</button>
      </div>
    )
  }
}
