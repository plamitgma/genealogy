import React from 'react';
import './Facebook.less';

const FacebookComponent = ({localization}) =>
    <section className="social-container">
        <div className="container social-icon-box">
            <img src={require('../../../../assets/img/new-home/social-icon.png')} />
        </div>
        <div className="container social-container-box">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <p className="text-faded">Seeking for more exciting events</p>
                    <h2 className="section-heading">Follow Streamy on social media</h2>
                    <div className="social-icon">
                        <a href="https://www.facebook.com/Streamyapp/" target="_blank">
                            <img src={require('../../../../assets/img/new-home/fb.png')} />
                        </a>
                        <a href="https://twitter.com/streamyapp" target="_blank">
                            <img src={require('../../../../assets/img/new-home/twiter.png')} />
                        </a>
                        <a href="https://www.youtube.com/channel/UC3e5ECq4h6TCOHf1izVw_cw?guided_help_flow=3&disable_polymer=true" target="_blank">
                            <img src={require('../../../../assets/img/new-home/youtube.png')} />
                        </a>
                        <a href="https://www.instagram.com/streamyapp/" target="_blank">
                            <img className="instagram-icon" src={require('../../../../assets/img/new-home/instagram.png')} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        
    </section>;
export default FacebookComponent;
