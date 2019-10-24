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
class BossInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
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
        {redirectTo && redirectTo !== location.pathname ? <Redirect to={redirectTo}></Redirect> : null}
        <NavBar mode='dark'>BOSS完善信息页</NavBar>
        <AvatarSelector
          selectAvatar={imgName => this.onChange('avatar', imgName)}
        ></AvatarSelector>
        <InputItem onChange={v => this.onChange('title', v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={v => this.onChange('company', v)}>
          公司名称
        </InputItem>
        <InputItem onChange={v => this.onChange('money', v)}>
          职位薪资
        </InputItem>
        <TextareaItem
          autoHeight={true}
          title='职位要求'
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

export default BossInfo;
