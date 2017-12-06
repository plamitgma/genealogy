import React from 'react';
import './Navigation.less';
import _ from 'lodash';
import countries from '../../../../constant/countries';
import { Link } from 'react-router-dom';
import utils from '../../../../utils';
import LoginComponent from "../../Login";
import PropTypes from 'prop-types';
import NavigationItemWithoutLogin from './NavigationItemWithoutLogin';
import NavigationItemLogin from './NavigationItemLogin';
import ProfileModalComponent from '../../../ProfileModal';
import {
    Modal
} from "react-bootstrap";


class NavigationComponent extends React.Component {

    static contextTypes = {
        router: PropTypes.shape({
            history: PropTypes.shape({
                push: PropTypes.func.isRequired,
                replace: PropTypes.func.isRequired
            }).isRequired,
            staticContext: PropTypes.object
        }).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            navigationModalState: false
        }
        this.setNavigationModalState = this.setNavigationModalState.bind(this);
    }

    setNavigationModalState(value) {
        this.setState({
            navigationModalState: value
        })
    }

    render() {
        const {
            loginAction,
            user
        } = this.props;

        return (
            <nav id="mainNav" className="navbar navbar-default navigation-bar">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-button-right"
                            onClick={() => this.setNavigationModalState(true)}
                            data-toggle="modal">
                            <span className="sr-only"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to="/">Tộc Phan</Link>
                    </div>
                </div>
                <ProfileModalComponent
                    navigationModalState={this.state.navigationModalState}
                    loginAction={loginAction}
                    user={user}
                    setNavigationModalState={this.setNavigationModalState} />
            </nav>
        );
    }
}
export default NavigationComponent;
