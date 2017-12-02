import React from 'react';
import { Link } from 'react-router-dom';
import './RightPanel.less';
import paymentMethods from '../../../../constant/paymentMethod';
import FiveStar from '../../FiveStar';
import PaymentMethodComponent from '../../PaymentMethod';

class RightPanelComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    renderLoadingvenue() {
        var result = [];
        for (var i = 0; i < 2; i++) {
            result.push(
                <div className="venue-box" key={i}>
                    <div className="venue-logo-box" style={{ backgroundImage: "url(" + require('../../../../../assets/img/default.png') + ")" }}>
                        <div className="venues-logo" />
                    </div>
                    <div className="venue-content">
                        <div className="empty-venue-name"></div>
                        <div className="empty-venue-star"></div>
                        <div className="empty-venue-hour"></div>
                        <div className="empty-venue-method"></div>
                    </div>
                </div>
            )
        }
        return result;
    }

    render() {
        const { venues, localization, isVenueLoading, pageInfo, handleLoadMore } = this.props;
        return (
            <div className="search-venue-right-panel">
                {(isVenueLoading && venues.length == 0) ?
                    this.renderLoadingvenue()
                    :
                    (
                        [
                            venues.map((item) => (
                                <Link key={item.venue.id} to={`/venuedetail/${item.venue.id}`} >
                                    <div className="venue-box">
                                        <div className="venue-logo-box" style={{ backgroundImage: "url(" + (item.venue.photo || require('../../../../../assets/img/default.png')) + ")" }}>
                                            <div className="venues-logo" />
                                        </div>
                                        <div className="venue-content">
                                            <div className="venue-name">{item.venue.name}</div>
                                            <div className="venue-star">
                                                <FiveStar rating={item.venue.rating} />
                                                <div className="rating-count">{item.venue.number_of_rating ? ("(" + item.venue.number_of_rating + ")") : ""}</div>
                                            </div>
                                            <div>
                                                <span className="venue-lable-text">
                                                    {localization.venue.openHours + ": "}
                                                </span>
                                                <span className="venue-lable-content">
                                                    {item.venue.opening_hours}
                                                </span>
                                            </div>
                                            <div className="venue-payment-method">
                                                {(item.venue.payment_methods && item.venue.payment_methods.length > 0) ?
                                                    <div>
                                                        <span className="hidden-xs venue-lable-text">{localization.venue.payBy}</span>
                                                        <PaymentMethodComponent venue={item.venue} />
                                                    </div> :
                                                    null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )),
                            isVenueLoading && this.renderLoadingvenue(),
                            pageInfo.hasMore && <div className="load-more-box">
                                <button className="btn btn-load-more" onClick={handleLoadMore}>
                                    LOAD MORE
                                    <img className="pull-right"
                                        src={require('../../../../../assets/img/home/login/arrow-down.png')} />
                                </button>
                            </div>
                        ]
                    )
                }

            </div>
        )
    }
}

export default RightPanelComponent;