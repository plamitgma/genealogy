import React from "react";
import { connect } from "react-redux";
import LiveMusicComponent from "../components/Home/LiveMusic/LiveMusic";
import FacebookComponent from "../components/Home/Facebook/Facebook";
import ServiceComponent from "../components/Home/Service/Service";

import {
    handleLogout,
    handleLogin
} from "../actions/user";

import {
    searchPerson
} from '../actions/searchPerson';

class HomePageComponent extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {
            user,
            person,
            searchPerson
        } = this.props;

        const loginAction = {
            handleLogout: this.props.handleLogout,
            handleLogin: this.props.handleLogin
        }

        return (
            <div className="new-home-page">
                <LiveMusicComponent
                    searchPerson={searchPerson}
                    loginAction={loginAction}
                    user={user} />
                <ServiceComponent />
                <FacebookComponent />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        person: state.person
    };
};

export default connect(mapStateToProps, {
    handleLogout,
    handleLogin,
    searchPerson
})(HomePageComponent);
