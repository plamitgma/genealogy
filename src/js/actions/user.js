import axiosClient from '../utils/axiosClient';
import { toast } from 'react-toastify';
import { authConfig } from './../config';

export const CHANGE_USER_DATA = 'CHANGE_USER_DATA';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export function handleLogout() {
  return (dispatch) => {
    firebase.auth().signOut().then(function () {
      const data = {
        isAuthenticated: false,
        info: null
      };
      dispatch((changeUserData(data)));
    }, function (error) {
      // An error happened.
    });

  }
}

export function changeUserData(data) {
  return dispatch => {
    dispatch({
      type: CHANGE_USER_DATA,
      data
    })
  }
}


export function handleLogin(isFB, successCallback) {
  return (dispatch) => {
    let provider = null;
    if (isFB) {
      provider = new firebase.auth.FacebookAuthProvider();
    } else {
      provider = new firebase.auth.GoogleAuthProvider();
    }
    authConfig.facebookPermissions.forEach(permission => provider.addScope(permission));
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const displayName = result.user.displayName;
        const photoURL = result.user.photoURL;
        const email = result.user.email;
        var token = result.credential.accessToken;
        firebase.database().ref(`users/${result.user.uid}`).set({
          token,
          displayName,
          photoURL,
          email,
          lastTimeLoggedIn: firebase.database.ServerValue.TIMESTAMP
        });
        const data = {
          isAuthenticated: true,
          info: {
            displayName,
            photoURL,
            email
          }
        }
        return dispatch((changeUserData(data)));
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        return dispatch({
          type: LOGIN_ERROR,
          error
        });
      });
  }
}
