import axiosClient from '../utils/axiosClient';

export const LOGIN_DATA_CHANGE = 'LOGIN_DATA_CHANGE';

export function handleLoginDataChange(key, value) {
  return (dispatch) => {
    var data = {key, value};
    return dispatch({
      type: LOGIN_DATA_CHANGE,
      data
    })
  }
}

