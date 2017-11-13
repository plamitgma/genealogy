export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_ERROR = 'CREATE_EVENT_ERROR';
export const UPDATE_EVENT_LIST_IN_MY_EVENT = 'UPDATE_EVENT_LIST_IN_MY_EVENT';
export const UPLOAD_MY_EVENT_PHOTO = 'UPLOAD_MY_EVENT_PHOTO';
export const SELECT_MY_EVENT = 'SELECT_MY_EVENT';
export const UPLOAD_EVENT_GALLERY = 'UPLOAD_EVENT_GALLERY';
export const UPDATE_EVENT_GALLERY = 'UPDATE_EVENT_GALLERY';
export const DELETE_EVENT_GALLERY = 'DELETE_EVENT_GALLERY';
export const CHECK_EVENT_VALIDITY = 'CHECK_EVENT_VALIDITY';
export const CHECK_EVENT_VALIDITY_ERROR = 'CHECK_EVENT_VALIDITY_ERROR';

import axiosClient from '../utils/axiosClient';
import { toast } from 'react-toastify';

export function createEvent(data, successFunc) {
    return (dispatch) => {
        let postData = { event: data };
        return axiosClient.post('/events', JSON.stringify(postData)).then(res => {
            successFunc();
        });
    }
}

export function getMyEvents(successFunc) {
    return (dispatch) => {
        axiosClient.get(`/events/auth_list?page=1&per_page=1000000`).then(response => {
            if (successFunc) {
                successFunc();
            }
            return dispatch({
                type: UPDATE_EVENT_LIST_IN_MY_EVENT,
                data: response.data.events
            })
        })
    }
}

export function getEventDetail(id) {
    return (dispatch) => {
        axiosClient.get(`/events/${id}`).then(res => {
            if (res.data.event.photo) {
                res.data.event.photo = res.data.event.photo + `?vs=${new Date().getTime()}`;
            }
            dispatch(selectMyEvent(res.data.event));
        })
    }
}

export function editEvent(data, successFunc) {
    return (dispatch) => {
        data.latitude = '' + data.latitude;
        data.longitude = '' + data.longitude;
        data.seat = '' + data.seat;
        data.available_seat = '' + data.available_seat;
        data.price = '' + data.price;
        data.wowza_stream_url = '';
        data.wowza_stream_id = '';
        let putData = { event: data };
        return axiosClient.put(`/events/${data.id}`, JSON.stringify(putData)).then(res => {
            successFunc();
        });
    }
}

export function updateEventStatus(eventId, data, successFunc) {
    return (dispatch) => {
        return axiosClient.put(`/events/${eventId}/change_status`, JSON.stringify(data)).then(res => {
            successFunc();
        });
    }
}

export function selectMyEvent(data) {
    return (dispatch) => {
        dispatch({
            type: SELECT_MY_EVENT,
            data
        })
        dispatch(getEventGallery(data.id));

    }
}

export function uploadEventPhoto(eventId, photo) {
    return (dispatch) => {
        const data = {
            photo
        }
        axiosClient.post(`/events/${eventId}/photo`, JSON.stringify(data))
            .then(response => {
                toast.success("Upload Event Logo Success!");
                return dispatch({
                    type: UPLOAD_MY_EVENT_PHOTO,
                    data: {
                        eventId,
                        photo: response.data.photo
                    }
                })
            })
    }
}

export function uploadEventGallery(eventId, gallery) {
    return (dispatch) => {
        const data = {
            gallery
        }
        axiosClient.post(`/events/${eventId}/galleries`, JSON.stringify(data))
            .then(response => {
                toast.success("Upload Gallery Success!");
                dispatch(getEventGallery(eventId));
            })
    }
}

export function deleteEventGallery(eventId, galleryId) {
    return dispatch => {
        axiosClient.delete(`/events/${eventId}/galleries/${galleryId}`)
            .then(response => {
                toast.success("Delete Gallery Success!");
                return dispatch({
                    type: DELETE_EVENT_GALLERY,
                    data: galleryId
                })
            })
    }
}

export function getEventGallery(eventId) {
    return (dispatch) => {
        axiosClient.get(`/events/${eventId}/galleries`)
            .then(response => {
                return dispatch({
                    type: UPDATE_EVENT_GALLERY,
                    data: response.data.galleries
                })
            })
    }
}


export function checkEventValidity(id) {
    return (dispatch) => {
        axiosClient.get(`/events/ratings/${id}/check_valid`).then(response => {
            if (!response.data.event_rating.event_name) {
                response.data.event_rating.event_name = '';
            }
            return dispatch({
                type: CHECK_EVENT_VALIDITY,
                data: response.data.event_rating
            })
        })
        .catch(error => {
            return dispatch({
                type: CHECK_EVENT_VALIDITY_ERROR,
                data: { uid: id, isError: true }
            });
        });
    }
}

export function updateEventRating(id, data, successFunc) {
    return axiosClient.put(`/events/ratings/${id}`, JSON.stringify(data)).then(res => {
        if (successFunc)
            successFunc();
    });
}
