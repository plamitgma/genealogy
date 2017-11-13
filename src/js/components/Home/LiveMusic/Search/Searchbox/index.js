import React from 'react';
import PropTypes from 'prop-types';
import './Searchbox.less';

class GoogleSearchBoxComponent extends React.Component {
    static contextTypes = {
        router: PropTypes.shape({
            history: PropTypes.shape({
                push: PropTypes.func.isRequired,
                replace: PropTypes.func.isRequired
            }).isRequired,
            staticContext: PropTypes.object
        }).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            address: "",
        };
        this.handleSearchVenue = this.handleSearchVenue.bind(this)
    }

    handleSearchVenue() {
        const { currentCountry } = this.props;
        const data = {
            address: this.state.address,
            info: null,
            name: this.state.currentSearchText,
            typeIds: this.state.currentVenueType
        }
        if (data.address || data.name || data.typeIds) {
            data.country = currentCountry.countryName;
            const currentPath = this.context.router.route.location.pathname;
            if (currentPath !== '/venue' && currentPath !== '/venue/onmap') {
                this.context.router.history.push('/venue');
            }
            this.props.searchVenue(data);
        }
    }

    handleChangeSearchText(e) {
        this.setState({
            currentSearchText: e.target.value
        })
    }

    handleSearchKey(e) {
        if (e.key === 'Enter') {
            this.handleSearchVenue();
        }
    }

    render() {
        return (
            <div className="other-country-search-box">
                <div className="search-text-box">
                    <input type="text" className="form-control"
                        value={this.state.currentSearchText}
                        onKeyPress={this.handleSearchKey.bind(this)}
                        onChange={this.handleChangeSearchText.bind(this)}
                        placeholder="Tìm tên trong dòng họ" />
                </div>
                <div className="button-search-box">
                    <button className="btn btn-primary" onClick={this.handleSearchVenue}>
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default GoogleSearchBoxComponent;