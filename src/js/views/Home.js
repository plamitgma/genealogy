import React from "react";
import { connect } from "react-redux";
import LiveMusicComponent from "../components/Home/LiveMusic/LiveMusic";
import FacebookComponent from "../components/Home/Facebook/Facebook";
import ServiceComponent from "../components/Home/Service/Service";
import AddPerson from "../components/Person/AddPerson";

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

        return (
            <div className="new-home-page">
                <LiveMusicComponent
                    loginAction={loginAction}
                    user={user} />
                <AddPerson />
                <ServiceComponent />
                <FacebookComponent />
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
