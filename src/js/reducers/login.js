import { Map, fromJS } from 'immutable';
import {
  LOGIN_DATA_CHANGE
} from "actions/login";

import {
  LOGIN_ERROR,
} from "../actions/user";

const emptyLoginData = {
  email: '',
  password: ''
};

const initialState = Map({
  loginModalState: false,
  alert: {
    visible: false,
    style: 'danger',
    message: ''
  },
  loginSuccess: null,
  loginError: null,
  loginSaving: false,
  loginData: emptyLoginData
});

const actionsMap = {

  [LOGIN_ERROR]: (state, action) => {
    return fromJS({
      ...state.toJS(), ...{
        loginError: action.data,
        alert: {
          visible: true,
          style: 'danger',
          message: getErrorMessage(action)
        }
      }
    });
  },

  [LOGIN_DATA_CHANGE]: (state, action) => {
    var loginData = state.toJS().loginData;
    loginData[action.data.key] = action.data.value;
    return fromJS({
      ...state.toJS(),
      loginData,
    })
  }
};

function getErrorMessage(action) {
  let errorMsg = "Internal server error";
  if (action.error.response) {
    if (action.error.response.data.errors.full_messages.join) {
      errorMsg = action.error.response.data.errors.full_messages.join(',');
    }
    else errorMsg = action.error.response.data.errors.full_messages;
  }
  return errorMsg;
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
