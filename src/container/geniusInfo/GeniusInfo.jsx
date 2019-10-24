import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';

import { update } from '../../redux/user.redux';
import AvatarSelector from '../../component/avatarSelector/AvatarSelector.jsx';

@connect(
  state => state.user,
  { update }
)
class GeniusInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      title: '',
      desc: ''
    };
  }

  onChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  render() {
    const { redirectTo, update, location } = this.props;
    return (
      <div>
        {redirectTo && redirectTo !== location.pathname ? (
          <Redirect to={redirectTo}></Redirect>
        ) : null}
        <NavBar mode='dark'>应聘者完善信息页</NavBar>
        <AvatarSelector
          selectAvatar={imgName => this.onChange('avatar', imgName)}
        ></AvatarSelector>
        <InputItem onChange={v => this.onChange('title', v)}>
          求职职位
        </InputItem>
        <TextareaItem
          autoHeight={true}
          title='个人简介'
          onChange={v => this.onChange('desc', v)}
        ></TextareaItem>
        <Button
          onClick={() => {
            update(this.state);
          }}
          type='primary'
        >
          保存
        </Button>
      </div>
    );
  }
}

export default GeniusInfo;
