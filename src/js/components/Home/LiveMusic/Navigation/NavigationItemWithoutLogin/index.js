import React from 'react';
import LoginComponent from "../../../Login";

class NavigationItemWithoutLoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginModalState: false
        }
        this.setLoginModalState = this.setLoginModalState.bind(this);
    }

    setLoginModalState(value) {
        this.setState({
            loginModalState: value
        })
    }
    
    render() {
        const { localization, loginAction, setNavigationModalState } = this.props;
        return (
            <div>
                <LoginComponent localization={localization}
                    setLoginModalState={this.setLoginModalState}
                    loginModalState={this.state.loginModalState}
                    loginAction={loginAction} />
                <ul>
                    <li onClick={() => this.setLoginModalState(true)}>
                        <a>
                            <img className="pull-left navigation-icon"
                                src={require('../../../../../../assets/img/home/login/login.png')} />
                            <span>{localization.home.userProfile.login}</span>
                            <img className="pull-right"
                                src={require('../../../../../../assets/img/home/login/arrow-down.png')} />
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default NavigationItemWithoutLoginComponent;