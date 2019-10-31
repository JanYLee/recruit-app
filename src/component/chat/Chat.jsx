import React, { Component } from 'react';

class Chat extends Component {
  render() {
    return (
      <div>
        chat with user: {this.props.match.params.user}
      </div>
    );
  }
}

export default Chat;
