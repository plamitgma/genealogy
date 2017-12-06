import React from 'react';
import PropTypes from 'prop-types';
import './Searchbox.less';

class GoogleSearchBoxComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
        };
        this.handleSearchPerson = this.handleSearchPerson.bind(this);
    }

    handleSearchPerson() {
        const data = {
            keyword: this.state.keyword,
        }
        if (data.keyword) {
            const currentPath = this.context.router.route.location.pathname;
            if (currentPath !== '/person') {
                this.context.router.history.push('/person');
            }
            this.props.searchPerson(data);
        }
    }

    handleSearchKey(e) {
        if (e.key === 'Enter') {
            this.handleSearchPerson();
        }
    }

    render() {
        return (
            <div className="other-country-search-box">
                <div className="search-text-box">
                    <input type="text" className="form-control"
                        value={this.state.keyword}
                        onKeyPress={this.handleSearchKey.bind(this)}
                        onChange={(e) => this.setState({
                            keyword: e.target.value
                        })}
                        placeholder="Tìm tên trong dòng họ" />
                </div>
                <div className="button-search-box">
                    <button className="btn btn-primary" onClick={this.handleSearchPerson}>
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        )
    }
}

GoogleSearchBoxComponent.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.shape({
            push: PropTypes.func.isRequired,
            replace: PropTypes.func.isRequired
        }).isRequired,
        staticContext: PropTypes.object
    }).isRequired
};

export default GoogleSearchBoxComponent;