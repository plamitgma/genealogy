import axiosClient from '../utils/axiosClient';
import { changeSearchLocation } from './location';
import { toast } from 'react-toastify';

export const FETCH_VENUE_TYPE = 'FETCH_VENUE_TYPE';
export const SEARCH_VENUE = 'SEARCH_VENUE';
export const SELECT_VENUE = 'SELECT_VENUE';
export const UPDATE_REVIEWER_LIST_IN_CURRENT_VENUE = 'UPDATE_REVIEWER_LIST_IN_CURRENT_VENUE';
export const LOAD_MORE_REVIEWER_LIST_IN_CURRENT_VENUE = 'LOAD_MORE_REVIEWER_LIST_IN_CURRENT_VENUE';
export const UPDATE_REVIEWER_LIST_IN_MY_VENUE = 'UPDATE_REVIEWER_LIST_IN_MY_VENUE';
export const GET_MY_VENUE = 'GET_MY_VENUE';
export const GET_FAVOURITE_VENUES = 'GET_FAVOURITE_VENUES';
export const UPLOAD_MY_PHOTO = 'UPLOAD_MY_PHOTO';
export const UPLOAD_VENUE_GALLERY = 'UPLOAD_VENUE_GALLERY';
export const DELETE_VENUE_GALLERY = 'DELETE_VENUE_GALLERY';
export const GET_VENUE_STATISTIC = 'GET_VENUE_STATISTIC';
export const GET_VENUE_RATING = 'GET_VENUE_RATING';
export const CHANGE_VENUE_LOADING = 'CHANGE_VENUE_LOADING';
export const GET_PAYMENT_METHODS = 'GET_PAYMENT_METHODS';
export const GET_LATEST_VENUE = 'GET_LATEST_VENUE';
export const LOAD_MORE_VENUE = 'LOAD_MORE_VENUE';

export function updateVenue(data, successFunc, errorFunc) {
    return (dispatch) => {
        if (!data.suburb) {
            delete data.suburb;
        }
        data.latitude = '' + data.latitude;
        data.longitude = '' + data.longitude;
        if (data.connect_to_twitter === null) {
            data.connect_to_twitter = '';
        }
        if (data.connect_to_instagram === null) {
            data.connect_to_instagram = '';
        }
        if (data.connect_to_facebook === null) {
            data.connect_to_facebook = '';
        }
        if (data.connect_to_google === null) {
            data.connect_to_google = '';
        }
        if (data.zip_code === null) {
            data.zip_code = '';
        }
        if (data.state === null) {
            data.state = '';
        }

        if (!data.facebook_user_id) {
            data.facebook_user_id = '';
        }
        if (!data.google_user_id) {
            data.google_user_id = '';
        }
        if (data.district_id) {
            data.district_id = parseInt(data.district_id);
        } else {
            delete data.district_id;
        }
        let putData = { venue: data };
        return axiosClient.put('/venues', JSON.stringify(putData)).then(response => {
            dispatch(getMyVenue());
            if (successFunc) {
                successFunc();
            }
        })
            .catch(error => {
                if (errorFunc) {
                    errorFunc(error);
                }
            });;
    }
}

export function getVenueType() {
    return (dispatch) => {
        axiosClient.get('/venues/types').then(response => {
            return dispatch({
                type: FETCH_VENUE_TYPE,
                data: response.data.venue_types
            })
        })
    }
}

export function getPaymentMethods() {
    return (dispatch) => {
        axiosClient.get('/venues/payment_methods').then(response => {
            return dispatch({
                type: GET_PAYMENT_METHODS,
                data: response.data.payment_methods
            })
        })
    }
}

export function getVenueFooter(id) {
    return dispatch => {
        dispatch({
            type: CHANGE_VENUE_LOADING,
            data: true
        });
        axiosClient.get(`/venues/${id}`).then(response => {
            var selectVenue = response.data.venue;
            axiosClient.get(`/events/search?venue_id=${id}`).then(res => {
                selectVenue.events = res.data.events;
                dispatch({
                    type: SELECT_VENUE,
                    data: selectVenue
                })
                dispatch({
                    type: CHANGE_VENUE_LOADING,
                    data: false
                });
            })
        }).catch(err => {
            dispatch({
                type: CHANGE_VENUE_LOADING,
                data: false
            });
        })
    }
}

export function getVenue(id) {
    return dispatch => {
        axiosClient.get(`/venues/${id}`).then(response => {
            return dispatch(selectVenue(response.data.venue));
        })
    }
}

export function selectVenue(data) {
    return (dispatch) => {
        dispatch({
            type: SELECT_VENUE,
            data
        })
    }
}

export function getVenueStatistic(startTime, endTime) {
    return dispatch => {
        axiosClient.get(`/venues/statistic?start_time=${startTime}&end_time=${endTime}`).then(response => {
            dispatch({
                type: GET_VENUE_STATISTIC,
                data: response.data.statistic
            })
        })
    }
}

export function getVenueRating() {
    return dispatch => {
        axiosClient.get(`/venues/rating`).then(response => {
            dispatch({
                type: GET_VENUE_RATING,
                data: response.data.rating
            })
        })
    }
}

export function getMyVenue() {
    return dispatch => {
        axiosClient.get(`/venues/my_venue?time=${new Date().getTime()}`).then(response => {
            if (response.data.venue.photo) {
                response.data.venue.photo = response.data.venue.photo + `?vs=${new Date().getTime()}`;
            }
            dispatch({
                type: GET_MY_VENUE,
                data: response.data.venue
            })
        })
    }
}

function searchVenueByPage(searchData, page, type) {
    return dispatch => {
        dispatch(changeSearchLocation(searchData));
        dispatch({
            type: CHANGE_VENUE_LOADING,
            data: true
        })
        let url = '/venues/search?';

        if (searchData.address) {
            url += 'address=' + searchData.address;
        }
        if (searchData.name) {
            url += '&name=' + searchData.name
        }
        if (searchData.info && searchData.info.district) {
            url += '&district_id=' + searchData.info.district;
        }
        if (searchData.typeIds) {
            url += '&typeIds=' + searchData.typeIds;
        }
        if (searchData.country) {
            url += '&country=' + searchData.country;
        }
        url += `&per_page=10&page=${page}`;

        axiosClient.get(url).then(response => {
            dispatch({
                type: type,
                data: {
                    venues: response.data.venues,
                    current_page: response.data.current_page,
                    total_count: response.data.total_count,
                    total_pages: response.data.total_pages
                }
            });
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

export function searchVenue(searchData) {
    return (dispatch) => {
        dispatch(searchVenueByPage(searchData, 1, SEARCH_VENUE));
    }
}

export function loadMoreVenue(searchData, page) {
    return (dispatch) => {
        dispatch(searchVenueByPage(searchData, page, LOAD_MORE_VENUE));
    }
}

export function uploadVenueLogo(logo) {
    return (dispatch) => {
        const data = {
            logo
        }
        axiosClient.post(`venues/logo`, JSON.stringify(data))
            .then(response => {
                toast.success("Upload Venue Logo Success!");
                return dispatch({
                    type: UPLOAD_MY_PHOTO,
                    data: response.data.photo
                })
            })
    }
}

export function uploadVenueGallery(gallery) {
    return (dispatch) => {
        const data = {
            gallery
        }
        axiosClient.post(`venues/galleries`, JSON.stringify(data))
            .then(response => {
                toast.success("Upload Gallery Success!");
                return dispatch({
                    type: UPLOAD_VENUE_GALLERY,
                    data: response.data.gallery
                })
            })
    }
}

export function deleteVenueGallery(galleryId) {
    return dispatch => {
        axiosClient.delete(`/venues/galleries/${galleryId}`)
            .then(response => {
                toast.success("Delete Gallery Success!");
                return dispatch({
                    type: DELETE_VENUE_GALLERY,
                    data: galleryId
                })
            })
    }
}


export function getReviewersForVenueOwner(page) {
    return (dispatch) => {
        axiosClient.get(`/venues/reviews?page=${page}&&per_page=10`).then(response => {
            return dispatch({
                type: UPDATE_REVIEWER_LIST_IN_MY_VENUE,
                data: response.data
            })
        })
    }
}

function getReviewersByVenueIdPaging(venueId, page, type) {
    return dispatch => {
        const url = `/venues/${venueId}/reviews?per_page=10&page=${page}`;
        axiosClient.get(url).then(response => {
            return dispatch({
                type: type,
                data: {
                    reviewers: response.data.reviews,
                    current_page: response.data.current_page,
                    total_count: response.data.total_count,
                    total_pages: response.data.total_pages
                }
            })
        })
    }
}

export function getReviewersByVenueId(venueId) {
    return (dispatch) => {
        dispatch(getReviewersByVenueIdPaging(venueId, 1, UPDATE_REVIEWER_LIST_IN_CURRENT_VENUE));
    }
}

export function getMoreReviewersByVenueId(venueId, page) {
    return dispatch => {
        dispatch(getReviewersByVenueIdPaging(venueId, page, LOAD_MORE_REVIEWER_LIST_IN_CURRENT_VENUE));
    }
}

export function favorOrUnFavorVenue(venueId) {
    return (dispatch) => {
        let data = { venue_id: venueId }
        return axiosClient.post(`/favor_venue`, data);
    };
}

export function getFavouriteVenues() {
    return dispatch => {
        axiosClient.get("/favourite_venues").then(response => {
            dispatch({
                type: GET_FAVOURITE_VENUES,
                data: response.data.venues
            })
        })
    }
}

export function getLatestVenues() {
    return (dispatch) => {
        var config = window.localStorage.getItem('clientConfig');
        var countryName = "";
        if (config) {
            config = JSON.parse(config);
            if (config && config.currentCountry) {
                countryName = config.currentCountry.countryName.replaceAll(" ", "");
            }
        }
        axiosClient.get(`/venues/lastest_venues?country=${countryName}`).then(response => {
            dispatch({
                type: GET_LATEST_VENUE,
                data: response.data.venues
            })
        })
    }
}

