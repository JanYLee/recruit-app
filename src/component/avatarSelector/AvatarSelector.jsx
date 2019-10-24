import React, { Component } from 'react';
import { List, Grid } from 'antd-mobile';

class AvatarSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const avatarList = '1a,1b,1c,1d,1e,1f,1g,1h'
      .split(',')
      .map(v => ({ icon: require(`../img/${v}.jpg`), text: v }));
    const gridHeader = this.state.text ? (
      <div>
        <span>已选择头像</span>
        <img src={this.state.icon} alt='avatar' style={{ width: 20 }} />
      </div>
    ) : (
      '请选择头像'
    );
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid
            data={avatarList}
            onClick={e => {
              this.setState(e);
              this.props.selectAvatar(e.text);
            }}
          ></Grid>
        </List>
      </div>
    );
  }
}

export default AvatarSelector;
