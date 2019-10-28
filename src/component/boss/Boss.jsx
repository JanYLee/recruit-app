import React, { Component } from 'react';
import Axios from 'axios';

import { Card, WingBlank } from 'antd-mobile';

class Boss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    Axios.get('/user/list?type=genius').then(res => {
      if (res.data.code === 0) {
        this.setState({ data: res.data.data });
        console.log(res.data.data);
      }
    });
  }

  render() {
    const { data } = this.state;
    return (
      <WingBlank>
        {data.map(v =>
          v.avatar ? (
            <Card key={v._id}>
              <Card.Header
                title={v.user}
                thumb={require(`../img/${v.avatar}.jpg`)}
                thumbStyle={{width: 50, height: 50}}
                extra={<span>{v.title}</span>}
              ></Card.Header>
              <Card.Body>
                {v.desc.split('\n').map(v => (
                  <div key={v}>{v}</div>
                ))}
              </Card.Body>
            </Card>
          ) : null
        )}
      </WingBlank>
    );
  }
}

export default Boss;
