import React from 'react';
import _ from 'lodash';

const StepComponent = ({ localization, data }) =>
    <div className="service-box">
        <div className={"service-image-box " + (data.isSecond ? "pull-right" : "")}
            style={{ backgroundImage: "url(" + data.url + ")" }}>
        </div>
        <div className={"step-box " + (data.isSecond ? "is-second" : "")}>
            <div className="step-title">{_.get(localization, data.title)}</div>
            <div className="step-box-line"></div>
            <div className="step-description">{_.get(localization, data.description)}</div>
        </div>
    </div>
export default StepComponent;