import React, { Component } from 'react';
import "./style.less";
import DateTime from 'react-datetime';

import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class AddPerson extends Component {
    constructor() {
        super();
        this.state = {
            fullName: "",
            calledName: "",
            gender: "",
            dateOfBirth: "",
            address: "",
            phone: "",
            dateOfDeath: "",
            positionInFamily: "",
            photo: "",
            parentId: "",
            wifeId: "",
            husbandId: ""
        }
        this.getValidationState = this.getValidationState.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getValidationState(field) {
        const length = this.state[field].length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    handleChange(value, field) {
        var person = { ...this.state.person };
        person[field] = value
        this.setState({ person });
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
            var logo = {};
            logo.logo_type = file.type;
            (function (type) {
                reader.onload = function (event) {
                    var person = { ...vm.state.person };
                    person.photo = event.target.result;
                    vm.setState({ person });
                }
            })(file.type)
            reader.readAsDataURL(file);
        }
    }

    render() {
        return (
            <div className="container add-person-container">
                <div className="left-content">
                    <input className="input-upload-file" type="file" onChange={this.handleUploadLogo} accept=".png,.jpg,.jpeg,.gif" />
                    <img className="venues-logo" src={this.state.photo || require('../../../assets/img/default.png')} />
                    <img className="venues-logo-upload" src={require('../../../assets/icons/upload-media.png')} />
                </div>
                <div className="right-content">
                    <form>
                        <FormGroup
                            controlId="formBasicText">
                            <ControlLabel>Họ tên</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.fullName}
                                placeholder="Nhập họ và tên"
                                onChange={(e) => this.handleChange(e.target.value, 'fullName')}
                            />
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText">
                            <ControlLabel>Tên thường gọi</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.calledName}
                                placeholder="Nhập tên thường gọi"
                                onChange={(e) => this.handleChange(e.target.value, 'calledName')}
                            />
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText">
                            <ControlLabel>Giới tính</ControlLabel>
                            <select
                                className="form-control"
                                value={this.state.gender}
                                onChange={(e) => this.handleChange(e.target.value, 'gender')}>
                                <option value={true}>Nam</option>
                                <option value={false}>Nữ</option>
                            </select>
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText">
                            <ControlLabel>Ngày sinh</ControlLabel>
                            <DateTime inputProps={{
                                placeholder: 'Nhập ngày sinh',
                                readOnly: true
                            }}
                                className="custom-date-class"
                                value={this.state.dateOfBirth}
                                dateFormat="DD/MM/YYYY"
                                timeFormat={false}
                                onChange={(e) => this.handleChange(e.target.value, 'dateOfBirth')} />
                        </FormGroup>

                        <FormGroup
                            controlId="formBasicText">
                            <ControlLabel>Địa chỉ</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.address}
                                placeholder="Nhập địa chỉ"
                                onChange={(e) => this.handleChange(e.target.value, 'address')}
                            />
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText">
                            <ControlLabel>Số điện thoại</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.phone}
                                placeholder="Nhập số điện thoại"
                                onChange={(e) => this.handleChange(e.target.value, 'phone')}
                            />
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText">
                            <ControlLabel>Thứ tự trong gia đình</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.positionInFamily}
                                placeholder="Nhập thứ tự trong gia đình"
                                onChange={(e) => this.handleChange(e.target.value, 'positionInFamily')}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Ba</ControlLabel>
                            <div className="input-group">
                                <input type="text" className="form-control"
                                    value={this.state.parentId}
                                    disabled={true}
                                    onChange={(e) => this.handleChange(e.target.value, 'parentId')}
                                    placeholder="Chọn ba" />
                                <span className="input-group-addon">...</span>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Vợ</ControlLabel>
                            <div className="input-group">
                                <input type="text" className="form-control"
                                    value={this.state.wifeId}
                                    disabled={true}
                                    onChange={(e) => this.handleChange(e.target.value, 'wifeId')}
                                    placeholder="Chọn vợ" />
                                <span className="input-group-addon">...</span>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Chồng</ControlLabel>
                            <div className="input-group">
                                <input type="text" className="form-control"
                                    value={this.state.husbandId}
                                    disabled={true}
                                    onChange={(e) => this.handleChange(e.target.value, 'husbandId')}
                                    placeholder="Chọn chồng" />
                                <span className="input-group-addon">...</span>
                            </div>
                        </FormGroup>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddPerson;