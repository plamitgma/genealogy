import { Map, fromJS } from 'immutable';
import {
    FETCH_VENUE_TYPE,
    SEARCH_VENUE,
    SELECT_VENUE,
    UPDATE_REVIEWER_LIST_IN_CURRENT_VENUE,
    LOAD_MORE_REVIEWER_LIST_IN_CURRENT_VENUE,
    UPDATE_REVIEWER_LIST_IN_MY_VENUE,
    GET_MY_VENUE,
    GET_FAVOURITE_VENUES,
    UPLOAD_MY_PHOTO,
    UPLOAD_VENUE_GALLERY,
    DELETE_VENUE_GALLERY,
    GET_VENUE_STATISTIC,
    GET_VENUE_RATING,
    CHANGE_VENUE_LOADING,
    GET_PAYMENT_METHODS,
    GET_LATEST_VENUE,
    LOAD_MORE_VENUE
} from "../actions/venue";

import {
    USER_LOUGOUT
} from '../actions/user';
import {
    UPDATE_EVENT_LIST_IN_CURRENT_VENUE,
    UPDATE_LOAD_MORE_EVENTS_IN_CURRENT_VENUE,
    UPDATE_EVENT_GALLERY_IN_VENUE
} from "../actions/event";

const initialState = {
    isVenueLoading: false,
    venueTypes: [],
    venues: [],
    currentVenue: {
        eventPageInfo: {
            current_page: 1,
            total_count: 0,
            total_pages: 1,
            hasMore: false
        },
        reviewerPageInfo: {
            current_page: 1,
            total_count: 0,
            total_pages: 1,
            hasMore: false
        }
    },
    myVenue: {},
    favouriteVenues: [],
    statistic: {},
    rating: {},
    review: {},
    paymentMethods: [],
    latestVenues: [],
    pageInfo: {
        current_page: 1,
        total_count: 0,
        total_pages: 1,
        hasMore: false
    }
};

const actionsMap = {
    [USER_LOUGOUT]: (state, data) => {
        return {
            ...state,
            myVenue: {},
            favouriteVenues: [],
            statistic: {},
            rating: {},
            review: {}
        };
    },
    [CHANGE_VENUE_LOADING]: (state, data) => {
        return {
            ...state,
            isVenueLoading: data
        };
    },
    [FETCH_VENUE_TYPE]: (state, data) => {
        return {
            ...state,
            venueTypes: data
        };
    },
    [GET_PAYMENT_METHODS]: (state, data) => {
        return {
            ...state,
            paymentMethods: data
        };
    },
    [SEARCH_VENUE]: (state, data) => {
        return {
            ...state,
            venues: data.venues,
            pageInfo: {
                current_page: data.current_page,
                total_count: data.total_count,
                total_pages: data.total_pages,
                hasMore: data.current_page < data.total_pages
            }
        };
    },
    [LOAD_MORE_VENUE]: (state, data) => {
        const venues = state.venues.concat(data.venues);
        return {
            ...state,
            venues,
            pageInfo: {
                current_page: data.current_page,
                total_count: data.total_count,
                total_pages: data.total_pages,
                hasMore: data.current_page < data.total_pages
            }
        }
    },
    [SELECT_VENUE]: (state, data) => {
        if (state.currentVenue.id == data.id) {
            return state;
        }
        var currentVenue = {
            ...data,
            eventPageInfo: {
                current_page: 1,
                total_count: 0,
                total_pages: 1,
                hasMore: false
            },
            reviewerPageInfo: {
                current_page: 1,
                total_count: 0,
                total_pages: 1,
                hasMore: false
            }
        };

        return {
            ...state,
            currentVenue
        }
    },
    [GET_VENUE_STATISTIC]: (state, data) => {
        return {
            ...state,
            statistic: data
        };
    },
    [GET_VENUE_RATING]: (state, data) => {
        return {
            ...state,
            rating: data
        };
    },
    [UPDATE_REVIEWER_LIST_IN_MY_VENUE]: (state, data) => {
        return {
            ...state,
            review: data
        };
    },
    [UPDATE_EVENT_LIST_IN_CURRENT_VENUE]: (state, data) => {
        const currentVenue = {
            ...state.currentVenue,
            events: data.events,
            eventPageInfo: {
                current_page: data.current_page,
                total_count: data.total_count,
                total_pages: data.total_pages,
                hasMore: data.current_page < data.total_pages
            }
        };
        return {
            ...state,
            currentVenue
        }
    },
    [UPDATE_LOAD_MORE_EVENTS_IN_CURRENT_VENUE]: (state, data) => {
        const currentVenue = {
            ...state.currentVenue,
            events: state.currentVenue.events.concat(data.events),
            eventPageInfo: {
                current_page: data.current_page,
                total_count: data.total_count,
                total_pages: data.total_pages,
                hasMore: data.current_page < data.total_pages
            }
        };
        return {
            ...state,
            currentVenue
        }
    },
    [UPDATE_EVENT_GALLERY_IN_VENUE]: (state, data) => {
        var { events } = state.currentVenue;
        var updateEvent = events.filter(item => {
            return item.event.id === data.event.id;
        })[0];
        if (updateEvent) {
            updateEvent.event.gallery = data.gallery;
        }
        const currentVenue = {
            ...state.currentVenue,
            events
        };
        return {
            ...state,
            currentVenue
        }
    },
    [UPDATE_REVIEWER_LIST_IN_CURRENT_VENUE]: (state, data) => {
        const currentVenue = {
            ...state.currentVenue,
            reviewers: data.reviewers,
            reviewerPageInfo: {
                current_page: data.current_page,
                total_count: data.total_count,
                total_pages: data.total_pages,
                hasMore: data.current_page < data.total_pages
            }
        };
        return {
            ...state,
            currentVenue
        }
    },
    [LOAD_MORE_REVIEWER_LIST_IN_CURRENT_VENUE]: (state, data) => {
        const currentVenue = {
            ...state.currentVenue,
            reviewers: state.currentVenue.reviewers.concat(data.reviewers),
            reviewerPageInfo: {
                current_page: data.current_page,
                total_count: data.total_count,
                total_pages: data.total_pages,
                hasMore: data.current_page < data.total_pages
            }
        };
        return {
            ...state,
            currentVenue
        }
    },
    [GET_MY_VENUE]: (state, data) => {
        return {
            ...state,
            myVenue: data
        }
    },
    [GET_FAVOURITE_VENUES]: (state, data) => {
        return {
            ...state,
            favouriteVenues: data
        }
    },

    [UPLOAD_MY_PHOTO]: (state, data) => {
        const myVenue = Object.assign({}, state.myVenue);
        myVenue.photo = data + `?vs=${new Date().getTime()}`;
        return {
            ...state,
            myVenue
        }
    },
    [UPLOAD_VENUE_GALLERY]: (state, data) => {
        const myVenue = Object.assign({}, state.myVenue);
        if (!myVenue.gallery) {
            myVenue.gallery = [];
        }
        myVenue.gallery.push(data);
        return {
            ...state,
            myVenue
        }
    },
    [DELETE_VENUE_GALLERY]: (state, data) => {
        const myVenue = Object.assign({}, state.myVenue);
        if (myVenue.gallery.length > 0) {
            myVenue.gallery = myVenue.gallery.filter(item => item.id !== data);
        }
        return {
            ...state,
            myVenue
        }
    },
    [GET_LATEST_VENUE]: (state, data) => {
        return {
            ...state,
            latestVenues: data
        }
    },
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action.data) : state;
}
