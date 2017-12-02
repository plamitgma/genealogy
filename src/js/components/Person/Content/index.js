import React from 'react';
import { Link } from 'react-router-dom';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import './Content.less';

class ContentComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { venues, isVenueLoading, pageInfo } = this.props.venue;
        const { localization, handleLoadMore } = this.props;
        return (
            <div className="venue-container-content">
                <div className="container venue-container-box">
                    <RightPanel
                        isVenueLoading={isVenueLoading}
                        venues={venues}
                        pageInfo={pageInfo}
                        localization={localization}
                        handleLoadMore={handleLoadMore}
                    />
                </div>
            </div>
        )
    }
}

export default ContentComponent;