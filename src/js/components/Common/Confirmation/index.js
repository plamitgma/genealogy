import React, { Component } from 'react';
import "./style.less";

import {
  Button,
  Modal,
  Alert
} from "react-bootstrap";

const ConfirmationComponent = ({ isShow, onConfirm, onHide, localization, message }) =>
  <Modal id="confirmationModal" show={isShow}
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
          className="confirm-button"
          onClick={onConfirm}>
          {localization.yes}
        </Button>
        <Button
          bsStyle="primary"
          bsSize="large"
          className="close-button"
          onClick={onHide}>
          {localization.no
          }
        </Button>
      </form>
    </Modal.Body>
  </Modal>
export default ConfirmationComponent;