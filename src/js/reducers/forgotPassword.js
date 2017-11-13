import { Map, fromJS } from 'immutable';
import {
  FORGOT_PASSWORD_DATA_CHANGE
} from "../actions/forgotPassword";

import {
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
} from "../actions/user";

const emptyForgotPasswordData = {
  email: ''
};

const initialState = Map({
  forgotPasswordModalState: false,
  alert: {
    visible: false,
    style: 'danger',
    message: ''
  },
  forgotPasswordSuccess: null,
  forgotPasswordError: null,
  forgotPasswordSaving: false,
  forgotPasswordData: emptyForgotPasswordData
});

const actionsMap = {
  [FORGOT_PASSWORD_SUCCESS]: (state, action) => {
    return fromJS({
      ...state.toJS(), ...{
        forgotPasswordModalState: false,
        forgotPasswordSuccess: action.data.message.full_messages[0],
        alert: {
          visible: true,
          style: 'success',
          message: action.data.message.full_messages[0]
        }
      }
    });
  },

  [FORGOT_PASSWORD_ERROR]: (state, action) => {
    return fromJS({
      ...state.toJS(), ...{
        forgotPasswordError: action.error,
        alert: {
          visible: true,
          style: 'danger',
          message: action.error.response.data.errors.full_messages.join ? action.error.response.data.errors.full_messages.join(',') : action.error.response.data.errors.full_messages
        }
      }
    });
  },

  [FORGOT_PASSWORD_DATA_CHANGE]: (state, action) => {
    var forgotPasswordData = state.toJS().forgotPasswordData;
    forgotPasswordData[action.data.key] = action.data.value;
    return fromJS({
      ...state.toJS(),
      forgotPasswordData,
    })
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}