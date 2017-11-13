import React from "react";
import { connect } from "react-redux";
import localization from "../language";
import LiveMusicComponent from "../components/Home/LiveMusic/LiveMusic";
import FacebookComponent from "../components/Home/Facebook/Facebook";
import ServiceComponent from "../components/Home/Service/Service";

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
            user
        } = this.props;

        const loginAction = {
            handleLogout: this.props.handleLogout,
            handleLogin: this.props.handleLogin
        }

        const locale = localization["VN"];
        return (
            <div className="new-home-page">
                <LiveMusicComponent
                    localization={locale}
                    loginAction={loginAction}
                    user={user} />
                <ServiceComponent localization={locale} />
                <FacebookComponent localization={locale} />
            </div>
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
