import React from 'react';

export default class WhatVideoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.openCloseModal = this.openCloseModal.bind(this);
        this.state = { youtubeLink: '' };
    }

    openCloseModal(flag) {
        if (flag) {
            this.setState({ youtubeLink: "//www.youtube.com/embed/YE7VzlLtp-4" })
        } else {
            this.setState({ youtubeLink: "" })
        }
    }
    render() {
        const { localization } = this.props;
        return (
            <div className="container text-center what-video">
                <div className="call-to-action">
                    <a href="#watchVideoModal" className="btn btn-default" onClick={() => this.openCloseModal(true)} data-toggle="modal">
                        {localization.home.watchVideo}
                        <i className="fa fa-play" aria-hidden="true"></i>
                    </a>
                </div>
                <div id="watchVideoModal" className="modal fade">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={() => this.openCloseModal(false)} data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 className="modal-title">Streamy</h4>
                            </div>
                            <div className="modal-body">
                                <iframe id="cartoonVideo" width="100%" height="450" src={this.state.youtubeLink} frameBorder="0" allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
