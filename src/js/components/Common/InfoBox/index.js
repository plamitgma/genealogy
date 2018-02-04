import React from 'react';
import classnames from 'classnames';
import "./style.less";

const InfoBoxComponent = ({ person, isBridgeLine }) => {
    return (
        <div className="person-box-tree">
            {
                isBridgeLine &&
                <div className="bridge-line"></div>
            }
            <div className="info-box">
                <div className="photo">
                    <img src={person.photo || require('../../../../assets/img/profile.jpg')} />
                </div>
                <div className="name">{person.fullName} {person.children ? `(${person.children.length})` : ''}</div>
            </div>
        </div>
    )
}

export default InfoBoxComponent;
