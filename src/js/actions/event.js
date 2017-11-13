import axiosClient from '../utils/axiosClient';

export const UPDATE_EVENT_LIST_IN_CURRENT_VENUE = 'UPDATE_EVENT_LIST_IN_CURRENT_VENUE';
export const UPDATE_LOAD_MORE_EVENTS_IN_CURRENT_VENUE = 'UPDATE_LOAD_MORE_EVENTS_IN_CURRENT_VENUE';
export const UPDATE_EVENT_GALLERY_IN_VENUE = 'UPDATE_EVENT_GALLERY_IN_VENUE';
export const CHANGE_VENUE_LOADING = 'CHANGE_VENUE_LOADING';
export const GET_LATEST_EVENT = 'GET_LATEST_EVENT';

function getEventsByVenueIdPaging(venueId, page, type) {
    return dispatch => {
        dispatch({
            type: CHANGE_VENUE_LOADING,
            data: true
        });
        const url = `/events/search?venue_id=${venueId}&per_page=10&page=${page}`;
        axiosClient.get(url).then(response => {
            dispatch({
                type: type,
                data: {
                    events: response.data.events,
                    current_page: response.data.current_page,
                    total_count: response.data.total_count,
                    total_pages: response.data.total_pages
                }
            })
            dispatch({
                type: CHANGE_VENUE_LOADING,
                data: false
            });
        }).catch(err => {
            dispatch({
                type: CHANGE_VENUE_LOADING,
                data: false
            });
        })
    }
}

export function getEventsByVenueId(venueId) {
    return (dispatch) => {
        dispatch(getEventsByVenueIdPaging(venueId, 1, UPDATE_EVENT_LIST_IN_CURRENT_VENUE));
    }
}

export function loadMoreEventsByVenueId(venueId, page) {
    return dispatch => {
        dispatch(getEventsByVenueIdPaging(venueId, page, UPDATE_LOAD_MORE_EVENTS_IN_CURRENT_VENUE));
    }
}

export function getEventGalleryByEventIdInCurrentVenue(event) {
    return (dispatch) => {
        axiosClient.get(`/events/${event.id}/galleries?per_page=200`)
            .then(response => {
                return dispatch({
                    type: UPDATE_EVENT_GALLERY_IN_VENUE,
                    data: {
                        event,
                        gallery: response.data.galleries
                    }
                })
            })
    }
}

export function getLatestEvents() {
    return (dispatch) => {
        var config = window.localStorage.getItem('clientConfig');
        var countryName = "";
        if (config) {
            config = JSON.parse(config);
            if (config && config.currentCountry) {
                countryName = config.currentCountry.countryName.replaceAll(" ", "");
            }
        }
        axiosClient.get(`/events/lastest_events?country=${countryName}`).then(response => {
            dispatch({
                type: GET_LATEST_EVENT,
                data: response.data.events
            })
        })
    }
}
