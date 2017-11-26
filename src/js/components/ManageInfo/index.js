import React from 'react';
import './style.less';
import PersonList from '../Person/PersonList';
import AddPerson from '../Person/AddPerson';
import { Route, NavLink } from 'react-router-dom';
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

    componentWillMount() {
        const { person, getAllPerson } = this.props;
        if (!person.persons) {
            getAllPerson();
        }
    }

    render() {
        const {
            match,
            user,
            person,
            loginAction,
            getAllPerson,
            addPerson,
            selectCurrentPerson,
            getPersonById
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
                    <div className="container header-bottom">
                        <NavLink exact to={match.url} activeClassName="active-tab" className="">
                            <span className="header-item-text">Danh sách họ hàng</span>
                        </NavLink>
                        <NavLink exact to={`${match.url}/add`} activeClassName="active-tab">
                            <span className="header-item-text">Thêm thành viên</span>
                        </NavLink>
                    </div>
                </nav>

                <div className="row venue-dashboard-content">
                    <Route exact path={`${match.url}`} render={() => (
                        <PersonList persons={person.persons} match={match} selectCurrentPerson={selectCurrentPerson} />
                    )} />
                    <Route exact path={`${match.url}/add`} render={() => (
                        <AddPerson addPerson={addPerson} match={match} />
                    )} />
                    <Route exact path={`${match.url}/person/:id`} render={() => (
                        <AddPerson addPerson={addPerson}
                            getPersonById={getPersonById}
                            persons={person.persons}
                            currentPersonDashboard={person.currentPersonDashboard} />
                    )} />
                </div>
            </div>
        );
    }
}

export default ManageInfoComponent;
