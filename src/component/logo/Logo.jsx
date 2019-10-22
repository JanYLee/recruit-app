import React, { Component } from 'react';

import './Logo.css';
import logoImg from './job.png';

class Logo extends Component {
  render() {
    return (
      <div className='Logo-Container'>
        <img src={logoImg} alt=""/>
      </div>
    );
  }
}

export default Logo;
