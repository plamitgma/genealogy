import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import utils from '../../../utils';
import Checkbox from '../../Common/Checkbox';
import './PersonList.less';

class PersonList extends React.Component {
    constructor() {
        super();
        this.state = {
            currentSearch: "",
            searchParent: false
        }
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchParentChange = this.onSearchParentChange.bind(this);
    }

    onSearchChange(e) {
        this.setState({
            currentSearch: e.target.value
        })
    }

    onSearchParentChange(e) {
        this.setState({
            searchParent: e.target.checked
        })
    }

    render() {
        const { persons, match, selectCurrentPerson } = this.props;
        if (persons.length == 0) {
            return null;
        }
        let currentList = persons.filter(per => utils.removeVietNameseString(per.fullName.toLowerCase()).indexOf(utils.removeVietNameseString(this.state.currentSearch.toLowerCase())) > -1)
        if (this.state.searchParent) {
            currentList = currentList.filter(per => per.parentId == null);
        }
        currentList = currentList.map(item => {
            return {
                ...item,
                class: item.class ? parseInt(item.class) : 100
            }
        })
        currentList = _.sortBy(currentList, ['class'], ['desc']);
        const isShowFilter = this.context.router.route.match.url === '/manage-info';
        return (
            <div className="person-list-container">
                {
                    isShowFilter && [
                        <input type="text"
                            placeholder="Tìm kiếm theo tên"
                            className="form-control"
                            onChange={this.onSearchChange} />,
                        <Checkbox
                            className="not-add-parent-yet"
                            text="Chưa có thông tin cha mẹ"
                            onChange={this.onSearchParentChange}
                        />
                    ]
                }
                {
                    currentList.map((person) => {
                        return (
                            <div className="person-container-item" key={person.id}>
                                <div className="person-container-item-info">
                                    <div className="photo"
                                        style={{ backgroundImage: "url(" + (person.photo || require('../../../../assets/img/profile.jpg')) + ")" }}></div>
                                    <div className="information">
                                        <p className="name">
                                            <NavLink className="navbar-brand" to={`${match.url}/person/${person.id}`} onClick={() => selectCurrentPerson(person)}>
                                                {person.fullName}
                                            </NavLink></p>
                                        <p className="name">{person.address}</p>
                                        <p className="name">Đời thứ: {person.class}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

PersonList.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.shape({
            push: PropTypes.func.isRequired,
            replace: PropTypes.func.isRequired
        }).isRequired,
        staticContext: PropTypes.object
    }).isRequired
};

export default PersonList;