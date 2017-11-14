import React from 'react';
import './style.less';
import AddPerson from '../Person/AddPerson';
import { Route, NavLink, Switch } from 'react-router-dom';
import ProfileModalComponent from '../ProfileModal';

class ManageInfoComponent extends React.Component {
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
            match,
            user,
            loginAction
        } = this.props;
        return (
            <div className="container manage-info-container">
                <ProfileModalComponent
                    navigationModalState={this.state.navigationModalState}
                    loginAction={loginAction}
                    user={user}
                    setNavigationModalState={this.setNavigationModalState} />
                <nav id="mainNav" className="navbar">
                    <div className="container">
                        <div className="navbar-header">
                            <NavLink className="navbar-brand" to="/">
                                <p>Tộc Phan</p>
                            </NavLink>
                            <div className="profile-picture">
                                <img
                                    onClick={() => this.setNavigationModalState(true)}
                                    src={user.info.photoURL ? user.info.photoURL : ''} />
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="row venue-dashboard-content">
                    <AddPerson />
                </div>
            </div>
        );
    }
}

export default ManageInfoComponent;
