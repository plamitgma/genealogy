import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import DateTime from 'react-datetime';
import utils from '../../utils';
import "./AddHusbandWifeInfo.less";

import {
    Modal
} from "react-bootstrap";

class AddHusbandWifeInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: props.husbandWifeInfo || {}
        }
        this.handleUpdateHusbandWifeInfo = this.handleUpdateHusbandWifeInfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value, field) {
        var info = { ...this.state.info };
        if (value instanceof Date) {
            info[field] = utils.formatDate(value);
        } else {
            info[field] = value;
        }
        this.setState({
            info
        })
    }

    handleUpdateHusbandWifeInfo() {
        const { updateHusbandWifeInfo, setAddHusbandWifeInfoState } = this.props;
        updateHusbandWifeInfo(this.state.info);
        setAddHusbandWifeInfoState(false);
    }
    render() {
        const { addHusbandWifeInfoModalState, setAddHusbandWifeInfoState, husbandWifeInfo, updateHusbandWifeInfo } = this.props;
        return (
            <Modal id="addHusbandWifeInfoModal" show={addHusbandWifeInfoModalState}
                backdrop='static'
                onHide={() => setAddHusbandWifeInfoState(false)}>
                <Modal.Header>
                    <p>Tộc Phan</p>
                    <img className="pull-right close-image"
                        src={require('../../../assets/img/home/login/close-icon.png')} onClick={() => setAddHusbandWifeInfoState(false)} />
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup
                            controlId="formBasicText">
                            <ControlLabel>Họ tên</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.info.fullName}
                                placeholder="Nhập họ và tên"
                                onChange={(e) => this.handleChange(e.target.value, 'fullName')}
                            />
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText">
                            <ControlLabel>Tên thường gọi</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.info.calledName}
                                placeholder="Nhập tên thường gọi"
                                onChange={(e) => this.handleChange(e.target.value, 'calledName')}
                            />
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText">
                            <ControlLabel>Ngày sinh</ControlLabel>
                            <DateTime inputProps={{
                                placeholder: 'Nhập ngày sinh',
                                readOnly: true
                            }}
                                className="custom-date-class"
                                value={this.state.info.dateOfBirth}
                                dateFormat="DD/MM/YYYY"
                                timeFormat={false}
                                onChange={(value) => this.handleChange(value._d, 'dateOfBirth')} />
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText">
                            <ControlLabel>Ngày mất</ControlLabel>
                            <DateTime inputProps={{
                                placeholder: 'Nhập ngày mất',
                                readOnly: true
                            }}
                                className="custom-date-class"
                                value={this.state.info.dateOfDeath}
                                dateFormat="DD/MM/YYYY"
                                timeFormat={false}
                                onChange={(value) => this.handleChange(value._d, 'dateOfDeath')} />
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText">
                            <ControlLabel>Số điện thoại</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.info.phone}
                                placeholder="Nhập số điện thoại"
                                onChange={(e) => this.handleChange(e.target.value, 'phone')}
                            />
                        </FormGroup>
                        <Button
                            bsStyle="primary"
                            bsSize="large"
                            className="confirm-button"
                            onClick={this.handleUpdateHusbandWifeInfo}>
                            Lưu
                      </Button>
                        <Button
                            bsStyle="primary"
                            bsSize="large"
                            className="close-button"
                            onClick={() => setAddHusbandWifeInfoState(false)}>
                            Thoát
                      </Button>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }

}

export default AddHusbandWifeInfoComponent;