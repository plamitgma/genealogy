import React, { Component } from 'react';
import "./SelectPersonModal.less";

import {
    Modal
} from "react-bootstrap";

const SelectPersonModalComponent = ({ selectPersonModalState, setSelectPersonModalState, persons, handleSelectPerson }) => {
    if (!persons) {
        return null;
    }
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
                {
                    Object.keys(persons).map((key) => {
                        let person = persons[key];
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
    );
}
export default SelectPersonModalComponent;