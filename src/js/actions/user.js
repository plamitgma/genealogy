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

const getUserData = (result) => {
  return dispatch => {
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
  }
}

export function handleLogin(isFB, successCallback) {
  return (dispatch) => {
    var provider = null;
    if (isFB) {
      provider = new firebase.auth.FacebookAuthProvider();
      authConfig.facebookPermissions.forEach(permission => provider.addScope(permission));
    } else {
      provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    }
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        dispatch(getUserData(result));
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...

        if (error.code === 'auth/account-exists-with-different-credential') {
          // Step 2.
          // User's email already exists.
          // The pending Facebook credential.
          var pendingCred = error.credential;
          // The provider account's email address.
          var email = error.email;
          // Get registered providers for this email.
          firebase.auth().fetchProvidersForEmail(email).then(function (providers) {
            console.log(providers);
            let provider = null;
            if(providers[0] == "google.com") {
              provider = new firebase.auth.GoogleAuthProvider();
              provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
            } else {
              provider = new firebase.auth.FacebookAuthProvider();
              authConfig.facebookPermissions.forEach(permission => provider.addScope(permission));
            }
            firebase.auth().signInWithPopup(provider).then(function (result) {
              result.user.link(pendingCred).then(function () {
                dispatch(getUserData(result));
                // Facebook account successfully linked to the existing Firebase user.
              });
            });
          });
        } else {
          return dispatch({
            type: LOGIN_ERROR,
            error
          });
        }
      });
  }
}
