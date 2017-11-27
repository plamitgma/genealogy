import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './PersonList.less';

const PersonList = ({ persons, match, selectCurrentPerson }) => {
    if (persons.length == 0) {
        return (
            <h1>No data</h1>
        )
    }

    return (
        <div className="person-list-container">
            {
                persons.map((person) => {
                    return (
                        <div className="container person-container-item" key={person.id}>
                            <div className="person-container-item-info">
                                <div className="photo"
                                    style={{ backgroundImage: "url(" + (person.photo || require('../../../assets/img/profile.jpg')) + ")" }}></div>
                                <div className="information">
                                    <p className="name">
                                        <NavLink className="navbar-brand" to={`${match.url}/person/${person.id}`} onClick={() => selectCurrentPerson(person)}>
                                            {person.fullName}
                                        </NavLink></p>
                                    <p className="name">{person.address}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default PersonList;