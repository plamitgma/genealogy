import React, { Component } from 'react';
import "./style.less";
import DateTime from 'react-datetime';
import AddHusbandWifeInfoComponent from './AddHusbandWifeInfo';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class AddPerson extends Component {
    constructor() {
        super();
        this.state = {
            person: {
                fullName: "",
                calledName: "",
                gender: true,
                dateOfBirth: "",
                address: "",
                phone: "",
                dateOfDeath: "",
                positionInFamily: "",
                photo: "",
                parentId: "",
                husbandWifeInfo: {}
            },
            addHusbandWifeInfoModalState: false
        }
        this.getValidationState = this.getValidationState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUploadLogo = this.handleUploadLogo.bind(this);
    }

    getValidationState(field) {
        const length = this.state.person[field].length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    handleChange(value, field) {
        var person = { ...this.state.person };
        if (field == "gender") {
            person[field] = value == "true" ? true : false;
        } else {
            person[field] = value
        }
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
                <div className="left-content" style={{ backgroundImage: "url(" + (this.state.person.photo ? this.state.person.photo : require('../../../assets/img/default.png')) + ")" }}>
                    <input className="input-upload-file" type="file" onChange={this.handleUploadLogo} accept=".png,.jpg,.jpeg,.gif" />
                    <img className="venues-logo-upload" src={require('../../../assets/icons/upload-media.png')} />
                </div>
                <div className="right-content">
                    <form>
                        <AddHusbandWifeInfoComponent
                            husbandWifeInfo={this.state.person.husbandWifeInfo}
                            addHusbandWifeInfoModalState={this.state.addHusbandWifeInfoModalState}
                            setAddHusbandWifeInfoState={() => this.setState({ addHusbandWifeInfoModalState: false })}
                            husbandWifeInfo={this.state.person.husbandWifeInfo}
                            updateHusbandWifeInfo={() => (info) => this.setState({
                                person: {
                                    ...this.state.person,
                                    husbandWifeInfo: info
                                }
                            })}
                        />
                        <FormGroup
                            controlId="formBasicText">
                            <ControlLabel>Họ tên</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.person.fullName}
                                placeholder="Nhập họ và tên"
                                onChange={(e) => this.handleChange(e.target.value, 'fullName')}
                            />
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText">
                            <ControlLabel>Tên thường gọi</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.person.calledName}
                                placeholder="Nhập tên thường gọi"
                                onChange={(e) => this.handleChange(e.target.value, 'calledName')}
                            />
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText">
                            <ControlLabel>Giới tính</ControlLabel>
                            <select
                                className="form-control"
                                value={this.state.person.gender}
                                onChange={(e) => this.handleChange(e.target.value, 'gender')}>
                                <option value={true}>Nam</option>
                                <option value={false}>Nữ</option>
                            </select>
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText">
                            <ControlLabel>Địa chỉ</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.person.address}
                                placeholder="Nhập địa chỉ"
                                onChange={(e) => this.handleChange(e.target.value, 'address')}
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
                                value={this.state.person.dateOfBirth}
                                dateFormat="DD/MM/YYYY"
                                timeFormat={false}
                                onChange={(e) => this.handleChange(e.target.value, 'dateOfBirth')} />
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText">
                            <ControlLabel>Ngày mất</ControlLabel>
                            <DateTime inputProps={{
                                placeholder: 'Nhập ngày mất',
                                readOnly: true
                            }}
                                className="custom-date-class"
                                value={this.state.person.dateOfDeath}
                                dateFormat="DD/MM/YYYY"
                                timeFormat={false}
                                onChange={(e) => this.handleChange(e.target.value, 'dateOfDeath')} />
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText">
                            <ControlLabel>Số điện thoại</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.person.phone}
                                placeholder="Nhập số điện thoại"
                                onChange={(e) => this.handleChange(e.target.value, 'phone')}
                            />
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText">
                            <ControlLabel>Thứ tự trong gia đình</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.person.positionInFamily}
                                placeholder="Nhập thứ tự trong gia đình"
                                onChange={(e) => this.handleChange(e.target.value, 'positionInFamily')}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Ba</ControlLabel>
                            <div className="input-group">
                                <input type="text" className="form-control"
                                    value={this.state.person.parentId}
                                    disabled={true}
                                    onChange={(e) => this.handleChange(e.target.value, 'parentId')}
                                    placeholder="Chọn ba" />
                                <span className="input-group-addon">...</span>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            {this.state.person.gender ?
                                <ControlLabel>Vợ</ControlLabel> :
                                <ControlLabel>Chồng</ControlLabel>
                            }
                            <div className="input-group">
                                <input type="text" className="form-control"
                                    value={this.state.person.husbandWifeInfo.fullName}
                                    disabled={true}
                                    placeholder={this.state.person.gender ? "Chọn vợ" : "Chọn chồng"} />
                                <span className="input-group-addon" onClick={() => this.setState({ addHusbandWifeInfoModalState: true })}>...</span>
                            </div>
                        </FormGroup>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddPerson;