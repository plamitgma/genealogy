import React, { Component } from 'react';
import "./Login.less";

import {
    Button,
    Modal,
    FormGroup,
    Row,
    Col
} from "react-bootstrap";

class LoginComponent extends Component {
    constructor(props, localization) {
        super(props);
    }

    handleFacebookClick = () => {

    };

    handleGoogleClick = () => {

    }

    render() {
        const { loginModalState, setLoginModalState, setSignUpModalState } = this.props;
        return (
            <div>
                <Modal id="loginModal" show={loginModalState}
                    onHide={() => setLoginModalState(false)}>
                    <Modal.Header>
                        <img className="pull-left" src={require('../../../../assets/img/home/login/header.png')} />
                        <img className="pull-right  close-image"
                            src={require('../../../../assets/img/home/login/close-icon.png')}
                            onClick={() => setLoginModalState(false)} />
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <Row>
                                <Col sm={6} xs={12}>
                                    <FormGroup>
                                        <Button
                                            bsStyle="primary"
                                            bsSize="large"
                                            className="col-xs-12 login-button facebook"
                                            onClick={this.handleFacebookClick}
                                        >
                                            <span className="fa fa-facebook pull-left" />
                                            {this.props.localization.home.login.logInWithFacebook}
                                        </Button>
                                    </FormGroup>
                                </Col>
                                <Col sm={6} xs={12}>
                                    <FormGroup>
                                        <Button
                                            bsStyle="primary"
                                            bsSize="large"
                                            className="col-xs-12 login-button google"
                                            onClick={this.handleGoogleClick}
                                        >
                                            <span className="fa fa-google-plus pull-left" />
                                            {this.props.localization.home.login.logInWithGoogle}
                                        </Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <a onClick={() => setLoginModalState(false)}>
                            <span className="fa fa-arrow-circle-o-left close-link" />
                        </a>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default LoginComponent;
