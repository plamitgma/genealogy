import React, { Component } from 'react';
import "./Login.less";

import {
  Button,
  Modal,
  Alert
} from "react-bootstrap";

class RequireLoginComponent extends Component {
  constructor(props, localization) {
    super(props);
  }

  render() {
    const { requireLoginModalState, setRequireLoginModalState, setLoginModalState, setSignUpModalState } = this.props;
    return (
      <div>
        <Modal id="loginModal" show={requireLoginModalState}
          onHide={() => setRequireLoginModalState(false)}>
          <Modal.Header>
            <img className="pull-left" src={require('../../../../assets/img/home/login/header.png')} />
            <img className="pull-right  close-image" src={require('../../../../assets/img/home/login/close-icon.png')} onClick={() => setRequireLoginModalState(false)} />
          </Modal.Header>
          <Modal.Body>
            <Alert bsStyle='danger'>
              <p className="require-login-text">{this.props.localization.home.login.requireLoginText}</p>
            </Alert>
            <form>
              <Button
                bsStyle="primary"
                bsSize="large"
                className="signup-button"
                onClick={() => setRequireLoginModalState(false)}
              >
                {this.props.localization.close}
              </Button>
              <h2>
                <span>{this.props.localization.home.login.or}</span>
              </h2>
              <Button
                bsStyle="primary"
                bsSize="large"
                className="signup-button"
                onClick={() => {
                  setLoginModalState(true);
                  setRequireLoginModalState(false);
                }}
              >
                {this.props.localization.home.login.login}
              </Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <a onClick={() => setRequireLoginModalState(false)}>
              <span className="fa fa-arrow-circle-o-left pull-left close-link" />
            </a>
            <div className="full-right">
              {this.props.localization.home.login.dontHaveAnAccount}
              <a onClick={() => {
                setSignUpModalState(true);
                setRequireLoginModalState(false);
              }} className="login-link">{this.props.localization.home.login.signUp}</a>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default RequireLoginComponent;