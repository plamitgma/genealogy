import React from 'react';
import StepComponent from './Step';
import WhatVideoComponent from './WhatVideo';
import './Service.less';
const step1 = require('../../../../assets/img/home/service/step-1.png');
const step2 = require('../../../../assets/img/home/service/step-2.png');
const step3 = require('../../../../assets/img/home/service/step-3.png');

const steps = [
    {
        url: step1,
        title: 'home.enterYourLocation',
        description: 'home.enterYourStreetOrPostcode'
    },
    {
        url: step2,
        title: 'home.chooseYourEvent',
        description: 'home.whatDoYouFancy',
        isSecond: true
    },
    {
        url: step3,
        title: 'home.payAndEnjoyYourEvents',
        description: 'home.payCashOrOnlineWithCreditcard'
    }
]

const ServiceComponent = ({ localization }) =>
    <section className="services">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <p className="text-faded">{localization.home.howItWorks}</p>
                    <h2 className="section-heading">{localization.home.easyAsThat}</h2>
                </div>
            </div>
        </div>
        <div className="service-step-container-box">
            <div className="row">
                {steps.map((item, index) => (
                    <div key={index} className="col-xs-12 text-center">
                        <StepComponent localization={localization} data={item} />
                    </div>
                ))}
            </div>
            <WhatVideoComponent localization={localization} />
        </div>
    </section>

export default ServiceComponent;
