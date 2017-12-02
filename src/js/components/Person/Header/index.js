import React from 'react';
import './Header.less';
import NavigationComponent from '../../Home/LiveMusic/Navigation';
import SearchComponent from '../../Home/LiveMusic/Search';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            loginAction,
            user,
            searchData,
            searchPerson } = this.props;

        return (
            <div className="venue-header-container">
                <NavigationComponent
                    user={user}
                    loginAction={loginAction}
                />
                <div className="container header-content">
                    <h1>Gia phả họ Phan</h1>
                    <p>Kết nối bà con trong dòng họ</p>
                    <div className="search-box">
                        <SearchComponent
                            searchData={searchData}
                            searchPerson={searchPerson}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderComponent;
