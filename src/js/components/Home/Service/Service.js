import React from 'react';
import StepComponent from './Step';
import './Service.less';
const step1 = require('../../../../assets/img/home/service/step-1.png');
const step2 = require('../../../../assets/img/home/service/step-2.png');
const step3 = require('../../../../assets/img/home/service/step-3.png');

const steps = [
    {
        url: step1,
        title: 'Tìm tên người trong tộc',
        description: 'Nhập tên người trong tộc để tìm kiếm'
    },
    {
        url: step2,
        title: 'Chọn người để xem thông tin',
        description: 'Xem thông tin chi tiết và con cái của họ',
        isSecond: true
    },
    {
        url: step3,
        title: 'Xem gia phả',
        description: 'Xem gia phả hoặc những người liên quan'
    }
]

const ServiceComponent = () =>
    <section className="services">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <p className="text-faded">Sử dụng như thế nào?</p>
                </div>
            </div>
        </div>
        <div className="service-step-container-box">
            <div className="row">
                {steps.map((item, index) => (
                    <div key={index} className="col-xs-12 text-center">
                        <StepComponent data={item} />
                    </div>
                ))}
            </div>
        </div>
    </section>

export default ServiceComponent;
