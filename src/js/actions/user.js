import axiosClient from '../utils/axiosClient';
import { toast } from 'react-toastify';

export const CHANGE_USER_DATA = 'CHANGE_USER_DATA';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';
export const USER_LOUGOUT = 'USER_LOUGOUT';
export const UPDATE_HAS_VENUE = 'UPDATE_HAS_VENUE';

export function handleLogout() {
  return (dispatch) => {
    window.localStorage.removeItem('authToken');
    const data = {
      isAuthenticated: false,
      info: null
    };
    dispatch({
      type: CHANGE_USER_DATA,
      data
    })
    dispatch({
      type: USER_LOUGOUT
    })
  }
}

export function handleLogin(loginData, successCallback) {
  return (dispatch) => {
    const url = 'auth/sign_in';
    dispatch(login(url, loginData, successCallback));
  }
}

export function handleLoginWithFacebook(accessToken, successCallback) {
  return (dispatch) => {
    const fbLogin = {
      access_token: accessToken
    };
    const url = 'auth/facebook_auth';
    dispatch(login(url, fbLogin, successCallback));
  }
}

export function handleLoginWithGoogle(idToken, successCallback) {
  return (dispatch) => {
    const ggLogin = {
      id_token: idToken
    };
    const url = 'auth/google_auth';
    dispatch(login(url, ggLogin, successCallback));
  }
}

const login = (url, loginData, successCallback) => {
  return dispatch => {
    axiosClient.post(url, JSON.stringify(loginData))
      .then(response => {
        if (response && response.data) {
          if (successCallback)
            successCallback.successFunction(successCallback.params);
          window.localStorage.setItem('authToken', JSON.stringify(response.headers));
          const data = {
            isAuthenticated: true,
            info: response.data.data
          }
          return dispatch({
            type: CHANGE_USER_DATA,
            data
          });
        }
      })
      .catch(error => {
        return dispatch({
          type: LOGIN_ERROR,
          error
        });
      });
  }
}

export function handleSignUp(data, successCallback) {
  return (dispatch) => {
    axiosClient.post(`auth`, JSON.stringify(data))
      .then(response => {
        if (response && response.data) {
          if (successCallback)
            successCallback();
        }
      })
      .catch(error => {
        return dispatch({
          type: SIGN_UP_ERROR,
          error
        });
      });
  }
}

export function updateProfile(data) {
  return (dispatch) => {
    axiosClient.put('user_profiles/update', JSON.stringify({ user: data }))
      .then(reponse => {
        dispatch(getCurrentUser());
        toast.success("Update Profile Successfully.");
      })
      .catch(error => {
        console.error(error)
      })
  }
}

export function changePassword(data, successCallback, errorCallback) {
  return (dispatch) => {
    axiosClient.put('auth/password', JSON.stringify(data))
      .then(reponse => {
        if (successCallback) {
          successCallback();
        }
      })
      .catch(error => {
        if (errorCallback) {
          errorCallback(error.response.data);
        }
      })
  }
}

export function handleForgotPassword(forgotPasswordData) {
  return (dispatch) => {
    axiosClient.post(`auth/password`, JSON.stringify(forgotPasswordData))
      .then(response => {
        if (response && response.data) {
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

export function getCurrentUser() {
  return (dispatch) => {
    axiosClient.get(`user_profiles/show`)
      .then(response => {
        if (response && response.data) {
          const data = {
            isAuthenticated: true,
            info: response.data.user
          }
          dispatch({
            type: CHANGE_USER_DATA,
            data
          })
        }
      })
      .catch(err => {
        window.localStorage.removeItem('authToken');
      });
  }
}

export function updateHasVenue(data) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_HAS_VENUE,
      data
    })
  }
}
