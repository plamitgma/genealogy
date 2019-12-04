import React from "react";
import { connect } from "react-redux";
import ManageInfoComponent from "../components/ManageInfo";

import {
    handleLogout,
    handleLogin
} from "../actions/user";

import {
    addPerson,
    getAll as getAllPerson,
    getById as getPersonById,
    selectCurrentPerson
} from "../actions/person";

const allowEmailAccess = [
    "plamitgma@gmail.com",
    "phanchieu75@gmail.com",
    "phanhuan123@gmail.com",
    "phanhohuyphong@gmail.com",
    "foresterlk@gmail.com",
]

class HomePageComponent extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        const { user } = this.props;
        if (!user || !user.info) {
            window.location = "/";
        }

        if(allowEmailAccess.indexOf(user.info.email) < 0) {
            window.location = "/";
        }
    }

    render() {
        const {
            user,
            person,
            match,
            addPerson,
            getPersonById,
            getAllPerson
        } = this.props;

        if (!user || !user.info) {
            return null;
        }

        if(allowEmailAccess.indexOf(user.info.email) < 0) {
            return null;
        }

        const loginAction = {
            handleLogout: this.props.handleLogout,
            handleLogin: this.props.handleLogin
        }

        return (
            <ManageInfoComponent {...this.props} loginAction={loginAction} />
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
    addPerson,
    getPersonById,
    selectCurrentPerson,
    getAllPerson
})(HomePageComponent);
