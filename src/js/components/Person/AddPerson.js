import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./style.less";
import DateTime from 'react-datetime';
import AddHusbandWifeInfoComponent from './AddHusbandWifeInfo';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import SelectPersonModal from './SelectPersonModal';

import utils from '../../utils';
class AddPerson extends Component {
    constructor() {
        super();
        this.state = {
            person: {
                fullName: "",
                calledName: "",
                gender: true,
                dateOfBirth: null,
                address: "",
                phone: "",
                dateOfDeath: null,
                positionInFamily: "",
                photo: null,
                parentId: null,
                parentName: "",
                husbandWifeInfo: {},
                description: ""
            },
            triggerValidate: false,
            addHusbandWifeInfoModalState: false,
            selectPersonModalState: false
        }
        this.getValidationState = this.getValidationState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUploadLogo = this.handleUploadLogo.bind(this);
        this.savePersonInformation = this.savePersonInformation.bind(this);
        this.handleChooseParent = this.handleChooseParent.bind(this);
    }

    componentWillMount() {
        const currentId = this.context.router.route.match.params.id;
        if (currentId) {
            const { currentPersonDashboard } = this.props;
            if (!currentPersonDashboard) {
                const { getPersonById } = this.props;
                getPersonById(currentId);
            } else {
                let nextPerson = {
                    ...currentPersonDashboard,
                    husbandWifeInfo: currentPersonDashboard.husbandWifeInfo || {}
                }
                this.setState({
                    person: nextPerson
                })
            }
        }
    }

    getValidationState(field) {
        if (!this.state.triggerValidate)
            return null;
        return !this.state.person[field] ? 'error' : 'success';
    }

    handleChange(value, field) {
        var person = { ...this.state.person };
        if (field == "gender") {
            person[field] = value == "true" ? true : false;
        } else {
            if(value instanceof Date) {
                person[field] = utils.formatDate(value);
            } else {
                person[field] = value
            }
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

    savePersonInformation() {
        this.setState({
            triggerValidate: true
        });
        if (!this.state.person.fullName)
            return;

        const { addPerson } = this.props;
        addPerson(this.state.person);
        this.context.router.history.push('/manage-info');
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const { currentPersonDashboard } = nextProps;
        if (this.context.router.route.match.params.id && currentPersonDashboard) {
            if (currentPersonDashboard.id != this.state.person.id) {
                let nextPerson = {
                    ...currentPersonDashboard,
                    husbandWifeInfo: currentPersonDashboard.husbandWifeInfo || {}
                }
                this.setState({
                    person: nextPerson
                })
            }
        }
    }

    handleChooseParent(parent) {
        var person = { ...this.state.person };
        person.parentId = parent.id;
        person.parentName = parent.fullName;
        this.setState({
            person,
            selectPersonModalState: false
        });
    }

    render() {
        const { currentPersonDashboard, persons } = this.props;
        if (this.context.router.route.match.params.id && !currentPersonDashboard) {
            return null;
        }
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
                        <SelectPersonModal selectPersonModalState={this.state.selectPersonModalState}
                            setSelectPersonModalState={() => this.setState({ selectPersonModalState: false })}
                            persons={persons}
                            handleSelectPerson={this.handleChooseParent}
                        />
                        <FormGroup
                            validationState={this.getValidationState('fullName')}
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
                                onChange={(e) => this.handleChange(e._d, 'dateOfBirth')} />
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
                                onChange={(e) => this.handleChange(e._d, 'dateOfDeath')} />
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
                                    value={this.state.person.parentName}
                                    disabled={true}
                                    placeholder="Chọn ba" />
                                <span className="input-group-addon" onClick={() => this.setState({ selectPersonModalState: true })}>...</span>
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
                        <FormGroup
                            className="text-area"
                            controlId="formBasicText">
                            <ControlLabel>Mô tả</ControlLabel>
                            <FormControl componentClass="textarea"
                                placeholder="Mô tả"
                                value={this.state.person.description}
                                onChange={(e) => this.handleChange(e.target.value, 'description')}
                            />
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText">
                            <Button bsClass="btn-primary form-control" onClick={this.savePersonInformation}>
                                Lưu Thông Tin
                            </Button>
                        </FormGroup>
                    </form>
                </div>
            </div>
        )
    }
}

AddPerson.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.shape({
            push: PropTypes.func.isRequired,
            replace: PropTypes.func.isRequired
        }).isRequired,
        staticContext: PropTypes.object
    }).isRequired
};

export default AddPerson;