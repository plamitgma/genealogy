import React from "react";
import { connect } from "react-redux";
import ManageInfoComponent from "../components/ManageInfo";

import {
    handleLogout,
    handleLogin
} from "../actions/user";

class HomePageComponent extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {
            user,
            match
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
        user: state.user
    };
};

export default connect(mapStateToProps, {
    handleLogout,
    handleLogin
})(HomePageComponent);
