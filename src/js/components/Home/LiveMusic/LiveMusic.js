import React from 'react';
import NavigationComponent from './Navigation';
import SearchComponent from './Search';
import './LiveMusic.less';

const LiveMusicComponent = ({ user, loginAction, searchPerson }) =>
    <header className="new-home-header">
        <NavigationComponent
            user={user}
            loginAction={loginAction}
        />
        <div className="container header-content">
            <h1>Gia phả họ Phan</h1>
            <p>Kết nối bà con trong dòng họ</p>
            <div className="search-box">
                <SearchComponent searchPerson={searchPerson} />
            </div>
        </div>
    </header>;
export default LiveMusicComponent;
