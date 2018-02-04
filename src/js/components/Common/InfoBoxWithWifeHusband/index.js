import React from 'react';
import classnames from 'classnames';
import "./style.less";

const InfoBoxComponent = ({ person }) => {
    return (
        <div className="info-box-with-husband-wife-person-box-tree">
            <div className="info-box">
                <div className="photo">
                    <img src={person.photo || require('../../../../assets/img/profile.jpg')} />
                </div>
                <div className="name">{person.fullName}</div>
            </div>
            {
                person.husbandWifeInfo && person.husbandWifeInfo.fullName &&
                <div className="info-box">
                    <div className="photo">
                        <img src={person.husbandWifeInfo.photo || require('../../../../assets/img/profile.jpg')} />
                    </div>
                    <div className="name">{person.husbandWifeInfo.fullName}</div>
                </div>
            }
        </div>
    )
}

export default InfoBoxComponent;
