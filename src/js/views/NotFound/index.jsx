import React, { Component } from 'react';
import './style.less';
import {NavLink} from 'react-router-dom';

export default class NotFound extends Component {
  render() {
    return (
      <div className='NotFound'>
        <NavLink exact to='/'>
          <p className="home_logo">Tộc Phan</p>
        </NavLink>
        <div className="content">
          <img src={require('../../../assets/img/not_found.png')} />
          <NavLink exact to='/'>
              <button className="btn-go-back">GO BACK HOME</button>
          </NavLink>
        </div>
      </div>
    );
  }
}
