import React from 'react';
import { connect } from 'react-redux';
import HeaderComponent from '../components/Person/Header';
// import ContentComponent from '../components/Person/Content';

import {
    handleLogout,
    handleLogin
} from "../actions/user";
import { searchPerson } from '../actions/searchPerson';



class PersonPageComponent extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {
            user,
            person,
            searchPerson,
            searchData
        } = this.props;

        const loginAction = {
            handleLogout: this.props.handleLogout,
            handleLogin: this.props.handleLogin
        }
        return (
            <div>
                <HeaderComponent
                    loginAction={loginAction}
                    searchData={searchData}
                    user={user}
                    searchPerson={searchPerson} />
                {/* <ContentComponent person={person}
                    searchData={searchData} /> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        person: state.person,
        searchData: state.searchData
    };
};

export default connect(mapStateToProps, {
    handleLogout,
    handleLogin,
    searchPerson
})(PersonPageComponent);

