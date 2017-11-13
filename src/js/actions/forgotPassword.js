import axiosClient from '../utils/axiosClient';

export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_DATA_CHANGE = 'FORGOT_PASSWORD_DATA_CHANGE';

export function handleForgotPasswordDataChange(key, value) {
  return (dispatch) => {
    var data = {key, value};
    return dispatch({
      type: FORGOT_PASSWORD_DATA_CHANGE,
      data
    })
  }
}

export function handleForgotPassword(forgotPasswordData) {
  return (dispatch) => {
    axiosClient.post(`auth/password`, JSON.stringify(forgotPasswordData))
      .then(response => {
        if (response && response.data) {
          window.localStorage.setItem('authToken', JSON.stringify(response.headers));
          
          var data = response.data;
          return dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            data
          });
        }
      })
      .catch(error => {
        return dispatch({
          type: FORGOT_PASSWORD_ERROR,
          error
        });
      });
  }
}
