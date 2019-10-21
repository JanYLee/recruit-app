import React, { Component } from 'react';
import { Button, List } from 'antd-mobile';

import './App.css';

function App() {
  return (
    <div className="App">
      <Parents></Parents>
    </div>
  );
}

function Parents() {
  const boss = 'Parents'
  return (
    <div>
      <h2>父组件: {boss}</h2>
      <Child1 name='1号'></Child1>
      <Child2 name='2号'></Child2>
    </div>
  )
}

function Child1(props) {
  return <h3>子组件1: {props.name}</h3>
}

class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []      
    }
  }

  handleClick = () => {
    const { list } = this.state;
    const newItem = {name: 'jay', age: 18}
    this.setState({list: [...list, newItem]});
  }

  render() {
    const { name } = this.props;
    const { list } = this.state;
    
    return(
      <div>
        <h3>子组件2: { name }</h3>
        <Button onClick={this.handleClick}>点击新增计数</Button>
        <p>计数器: { list.length }</p>
        <List renderHeader={() => '计数列表'}>
          {list.map((ele, i) => <List.Item key={i}>{ele.name}, {ele.age}</List.Item>)}
        </List>
      </div>
    )
  }
}


export default App;
