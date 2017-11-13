import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import "../../../styles/creative.less";

import PropTypes from 'prop-types';
import '../../../styles/fonts/Montserrat/Montserrat.less';
import '../../../styles/creative.less';
import classNames from 'classnames';

import utils from '../../utils';

import HomeComponent from '../Home';
import NotFound from 'views/NotFound';
import '../../../styles/react-datetime.less';
import '../../../styles/react-toastify.less';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux'

import { changeUserData } from '../../actions/user';
const publicPath = '/';

export const routeCodes = {
    HOME: publicPath,
    NOT_FOUND: `${publicPath}NotFound`
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            isShowScrollButton: false
        }
        this.handScroll = this.handScroll.bind(this);
    }

    componentWillMount() {
        const userKey = Object.keys(window.localStorage)
            .filter(it => it.startsWith('firebase:authUser'))[0];
        const user = userKey ? JSON.parse(localStorage.getItem(userKey)) : null;
        if (user) {
            const { changeUserData } = this.props;
            const { displayName, photoURL, email } = user;
            const data = {
                isAuthenticated: true,
                info: {
                    displayName,
                    photoURL,
                    email
                }
            }
            changeUserData(data);
        }
    }

    componentDidMount() {
        document.addEventListener("scroll", this.handScroll);
    }
    handleScrollTop() {
        let body = document.querySelector('body');
        var moveUp = setInterval(function () {
            window.scrollTo(0, window.scrollY - 32);
            if (window.scrollY <= 0) {
                clearInterval(moveUp);
            }
        }, 5);
    }

    handScroll() {
        const self = this;
        clearTimeout(window.delayScroll);
        window.delayScroll = setTimeout(function () {
            if (window.scrollY > 400 && !self.state.isShowScrollButton) {
                self.setState({
                    isShowScrollButton: true
                })
            } else if (window.scrollY <= 400 && self.state.isShowScrollButton) {
                self.setState({
                    isShowScrollButton: false
                })
            }
        }, 50);

    }

    render() {
        return (
            <div>
                <ToastContainer
                    position="bottom-right"
                    type="default"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnHover
                />
                <BrowserRouter>
                    <Switch>
                        <Route exact path={publicPath} component={HomeComponent} />
                        <Route path='*' component={NotFound} />
                    </Switch>
                </BrowserRouter>

                <a onClick={this.handleScrollTop}
                    className={classNames('scroll-up', { 'showScrollButton': this.state.isShowScrollButton })}>
                    <img src={require('../../../assets/icons/scroll-up.png')} />
                </a>
            </div >
        );
    }
}

export default connect(null, { changeUserData })(App);
