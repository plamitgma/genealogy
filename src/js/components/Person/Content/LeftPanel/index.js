import React from 'react';
import './LeftPanel.less';

class LeftPanelComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchByTypeId = this.handleSearchByTypeId.bind(this);
    }

    handleSearchByTypeId(e, isMobileView) {
        const { currentSearch, searchVenue, changeToggleLeftColumn } = this.props;
        if (currentSearch.typeIds != e.target.value) {
            if(isMobileView){
                changeToggleLeftColumn();
            }
            const searchData = {
                address: currentSearch.address,
                name: "",
                typeIds: e.target.value,
                info: currentSearch.info
            }
            searchVenue(searchData);
        }
    }

    render() {
        const { venueTypes, currentSearch, searchVenue, localization, currentToggle } = this.props;
        return (
            <div className="row venue-left-panel">
                <div className={"col-xs-12 visible-xs " + (currentToggle ? "hide" : "")}>
                    <button className="btn btn-primary" value="" onClick={(e) => this.handleSearchByTypeId(e, true)}>{localization.venue.allVenue}</button>
                    {venueTypes.map((item) => (
                        <button key={item.id} className="btn btn-default" value={item.id} onClick={(e) => this.handleSearchByTypeId(e, true)}>{item.name}</button>
                    ))}
                </div>
                <div className="col-xs-12 hidden-xs">
                    <button className="btn btn-primary" value="" onClick={(e) => this.handleSearchByTypeId(e, false)}>{localization.venue.allVenue}</button>
                    {venueTypes.map((item) => (
                        <button key={item.id} className="btn btn-default" value={item.id} onClick={(e) => this.handleSearchByTypeId(e, false)}>{item.name}</button>
                    ))}
                </div>
            </div>
        )
    }
}

export default LeftPanelComponent;