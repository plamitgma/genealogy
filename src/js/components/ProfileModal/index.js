import React, { Component } from 'react';
import "./style.less";
import NavigationItemWithoutLogin from '../Home/LiveMusic/Navigation/NavigationItemWithoutLogin';
import NavigationItemLogin from '../Home/LiveMusic/Navigation/NavigationItemLogin';

import {
    Modal
} from "react-bootstrap";

const ProfileModalComponent = ({ navigationModalState, loginAction, user, setNavigationModalState }) => {
    return (
        <Modal id="myProfileModal" show={navigationModalState}
            backdrop='static'
            onHide={() => setNavigationModalState(false)}>
            <Modal.Header>
                <p>Tộc Phan</p>
                <img className="pull-right close-image"
                    src={require('../../../assets/img/home/login/close-icon.png')} onClick={() => setNavigationModalState(false)} />
            </Modal.Header>
            <Modal.Body>
                {user.isAuthenticated ?
                    <NavigationItemLogin loginAction={loginAction} user={user} /> :
                    <NavigationItemWithoutLogin loginAction={loginAction} setNavigationModalState={setNavigationModalState}/>
                }
            </Modal.Body>
        </Modal>
    );
}
export default ProfileModalComponent;