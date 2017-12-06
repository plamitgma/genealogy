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

class HomePageComponent extends React.Component {
    constructor() {
        super();
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
