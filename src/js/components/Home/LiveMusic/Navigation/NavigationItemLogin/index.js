import React from 'react';
import PropTypes from 'prop-types';

class NavigationItemLoginComponent extends React.Component {
    handleLogoutAction() {
        const { loginAction } = this.props;
        this.context.router.history.push('/');
        loginAction.handleLogout();
    }
    render() {
        const { loginAction, user } = this.props;
        return (
            <div>
                <div className="profilePicture" style={{ backgroundImage: "url(" + (user.info.photoURL || require('../../../../../../assets/img/home/login/profile_default.png')) + ")" }}>
                </div>
                <p className="text-center display-name">{user.info.displayName}</p>
                <ul>
                    <li data-dismiss="modal" onClick={() => {
                        this.context.router.history.push('/manage-info');
                    }}>
                        <a>
                            <img className="pull-left navigation-icon"
                                src={require('../../../../../../assets/img/home/login/venueDashboard.png')} />
                            <span>Quản lý thông tin</span>
                            <img className="pull-right"
                                src={require('../../../../../../assets/img/home/login/arrow-down.png')} />
                        </a>
                    </li>
                    <li onClick={this.handleLogoutAction.bind(this)}>
                        <a>
                            <img className="pull-left navigation-icon"
                                src={require('../../../../../../assets/img/home/login/logout.png')} />
                            <span>Đăng xuất</span>
                            <img className="pull-right"
                                src={require('../../../../../../assets/img/home/login/arrow-down.png')} />
                        </a>
                    </li>
                </ul>
            </div >
        )
    }
}

NavigationItemLoginComponent.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.shape({
            push: PropTypes.func.isRequired,
            replace: PropTypes.func.isRequired
        }).isRequired,
        staticContext: PropTypes.object
    }).isRequired
}

export default NavigationItemLoginComponent;