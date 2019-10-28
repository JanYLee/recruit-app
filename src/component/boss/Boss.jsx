import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, WingBlank } from 'antd-mobile';

import { getUserList } from '../../redux/chatuser.redux';

@connect(
  state => state.chatuser,
  { getUserList }
)
class Boss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.props.getUserList('genius')
  }

  render() {
    const { userList } = this.props;
    return (
      <WingBlank>
        {userList.map(v =>
          v.avatar ? (
            <Card key={v._id}>
              <Card.Header
                title={v.user}
                thumb={require(`../img/${v.avatar}.jpg`)}
                thumbStyle={{ width: 50, height: 50 }}
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
