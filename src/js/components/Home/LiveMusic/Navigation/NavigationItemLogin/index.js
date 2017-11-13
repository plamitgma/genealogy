import React from 'react';

const NavigationItemLoginComponent = ({ loginAction, localization }) => {
    const handleLogoutUser = () => {
        loginAction.handleLogout();
    }
    return (
        <div>
            <div className="profilePicture" style={{ backgroundImage: "url(" + (user.info.profile_picture || require('../../../../../../assets/img/home/login/profile_default.png')) + ")" }}>
            </div>
            <ul>
                <li onClick={this.handleLogoutUser}>
                    <a>
                        <img className="pull-left navigation-icon"
                            src={require('../../../../../../assets/img/home/login/logout.png')} />
                        <span>{localization.home.userProfile.logout}</span>
                        <img className="pull-right"
                            src={require('../../../../../../assets/img/home/login/arrow-down.png')} />
                    </a>
                </li>
            </ul>
        </div >
    )
}

export default NavigationItemLoginComponent;