import React, { Component } from 'react';
import "./SelectPersonModal.less";

import {
    Modal,
    FormControl
} from "react-bootstrap";

class SelectPersonModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentList: props.persons
        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        const { persons } = nextProps;
        this.setState({
            currentList: persons
        })
    }

    handleSearchChange(e) {
        const { persons } = this.props;
        this.setState({
            currentList: persons.filter(per => per.fullName.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
        })
    }
    render() {
        const { selectPersonModalState, setSelectPersonModalState, persons, handleSelectPerson } = this.props;
        return (
            <Modal id="select-person-modal" show={selectPersonModalState}
                backdrop='static'
                onHide={() => setSelectPersonModalState(false)}>
                <Modal.Header>
                    <p>Tộc Phan</p>
                    <img className="pull-right close-image"
                        src={require('../../../assets/img/home/login/close-icon.png')} onClick={() => setSelectPersonModalState(false)} />
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                        type="text"
                        placeholder="Nhập họ và tên"
                        onChange={this.handleSearchChange}
                    />
                    {
                        this.state.currentList.map((person) => {
                            return (
                                <div className="person-container-item" key={person.id} onClick={() => handleSelectPerson(person)}>
                                    <div className="person-container-item-info">
                                        <div className="photo"
                                            style={{ backgroundImage: "url(" + (person.photo || require('../../../assets/img/profile.jpg')) + ")" }}></div>
                                        <div className="information">
                                            <p className="name">
                                                {person.fullName}</p>
                                            <p className="name">{person.address}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Modal.Body>
            </Modal>
        )
    }
}

export default SelectPersonModalComponent;