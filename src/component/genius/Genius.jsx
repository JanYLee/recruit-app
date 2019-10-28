import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUserList } from '../../redux/chatuser.redux';
import UserCard from '../userCard/UserCard.jsx';

@connect(
  state => state.chatuser,
  { getUserList }
)
class Genius extends Component {
  componentDidMount() {
    this.props.getUserList('boss');
  }

  render() {
    const { userList } = this.props;
    return <UserCard userList={userList} />;
  }
}

export default Genius;
