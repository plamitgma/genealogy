export const CONNECT_VENUE_DATA_CHANGE = 'CONNECT_VENUE_DATA_CHANGE';
export const CHANGE_CONNECT_VENUE_TAB = 'CHANGE_CONNECT_VENUE_TAB';
export const CREATE_VENUE_SUCCESS = 'CREATE_VENUE_SUCCESS';
export const CREATE_VENUE_ERROR = 'CREATE_VENUE_ERROR';
import axiosClient from '../utils/axiosClient';

export function handleConnectVenueDataChange(key, value) {
  return (dispatch) => {
    var data = {key, value};
    return dispatch({
      type: CONNECT_VENUE_DATA_CHANGE,
      data
    })
  }
}

export function createVenue(data, successFunc, errorFunc) {
    return (dispatch) => {
        let postData = {venue: data};
        return axiosClient.post('/venues', JSON.stringify(postData)).then(response => {
            successFunc(response);
        })
        .catch(error => {
            errorFunc(error);
        });;
    }
}

