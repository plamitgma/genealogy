import React, { Component } from 'react';
import "./style.less";

import {
  Button,
  Modal,
  Alert
} from "react-bootstrap";

const NotificationModalComponent = ({ isShow, onHide, message }) =>
  <Modal id="notificationModal" show={isShow}
    onHide={onHide}>
    <Modal.Header>
      <img className="pull-left" src={require('../../../../assets/img/home/login/header.png')} />
      <img className="pull-right  close-image" src={require('../../../../assets/img/home/login/close-icon.png')} onClick={onHide} />
    </Modal.Header>
    <Modal.Body>
      <p className="warning-text">{message}</p>
      <form>
        <Button
          bsStyle="primary"
          bsSize="large"
          className="ok-button"
          onClick={onHide}>
          OK
        </Button>
      </form>
    </Modal.Body>
  </Modal>
export default NotificationModalComponent;