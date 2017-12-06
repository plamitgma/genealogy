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
    constructor(props) {
        super(props);
    }

    handleFacebookClick = () => {
        const { loginAction } = this.props;
        loginAction.handleLogin(true);
    };

    handleGoogleClick = () => {
        const { loginAction } = this.props;
        loginAction.handleLogin(false);
    }

    render() {
        const { loginModalState, setLoginModalState, setSignUpModalState } = this.props;
        return (
            <div>
                <Modal id="loginModal" show={loginModalState}
                    onHide={() => setLoginModalState(false)}>
                    <Modal.Header>
                        <p>Tộc Phan</p>
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
                                            Đăng nhập với Facebook
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
                                            Đăng nhập với Google
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
