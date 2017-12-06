import React from 'react';

const StepComponent = ({ data }) =>
    <div className="service-box">
        <div className={"service-image-box " + (data.isSecond ? "pull-right" : "")}
            style={{ backgroundImage: "url(" + data.url + ")" }}>
        </div>
        <div className={"step-box " + (data.isSecond ? "is-second" : "")}>
            <div className="step-title">{data.title}</div>
            <div className="step-box-line"></div>
            <div className="step-description">{data.description}</div>
        </div>
    </div>
export default StepComponent;