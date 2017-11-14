import React from 'react';

const NavigationItemLoginComponent = ({ loginAction, user }) => {
    const handleLogoutUser = () => {
        loginAction.handleLogout();
    }
    return (
        <div>
            <div className="profilePicture" style={{ backgroundImage: "url(" + (user.info.photoURL || require('../../../../../../assets/img/home/login/profile_default.png')) + ")" }}>
            </div>
            <p className="text-center display-name">{user.info.displayName}</p>
            <ul>
                <li>
                    <a>
                        <img className="pull-left navigation-icon"
                            src={require('../../../../../../assets/img/home/login/venueDashboard.png')} />
                        <span>Quản lý thông tin</span>
                        <img className="pull-right"
                            src={require('../../../../../../assets/img/home/login/arrow-down.png')} />
                    </a>
                </li>
                <li onClick={handleLogoutUser}>
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

export default NavigationItemLoginComponent;