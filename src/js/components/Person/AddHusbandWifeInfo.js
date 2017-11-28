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
        this.handleUploadLogo = this.handleUploadLogo.bind(this);
    }

    handleUploadLogo(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageSize = file.size / 1024;
            if (imageSize > 800) {
                toast.warning('Dung lượng file quá lớn');
                return;
            }
            const vm = this;
            var reader = new FileReader();
            (function (type) {
                reader.onload = function (event) {
                    var info = { ...vm.state.info };
                    info.photo = event.target.result;
                    vm.setState({ info });
                }
            })(file.type)
            reader.readAsDataURL(file);
        }
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
                        <FormGroup className="husband-wife-photo-section">
                            <div className="husband-wife-photo" style={{ backgroundImage: "url(" + (this.state.info.photo ? this.state.info.photo : require('../../../assets/img/profile.jpg')) + ")" }}>
                                <input className="input-upload-file" type="file" onChange={this.handleUploadLogo} accept=".png,.jpg,.jpeg,.gif" />
                                <img className="logo-upload" src={require('../../../assets/icons/upload-media.png')} />
                            </div>
                        </FormGroup>
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