import { CHANGE_MODAL_STATE } from "actions/signUp";
import { Map, fromJS } from 'immutable';
import {
  SIGN_UP_DATA_CHANGE
} from "../actions/signUp";

import {
  SIGN_UP_ERROR,
} from "../actions/user";

const emptySignUpData = {
  email: '',
  password: '',
  password_confirmation: '',
  first_name: '',
  last_name: ''
};

const initialState = Map({
  signUpModalState: false,
  alert: {
    visible: false,
    style: 'danger',
    message: ''
  },
  signUpSuccess: null,
  signUpError: null,
  signUpSaving: false,
  signUpData: emptySignUpData
});

const actionsMap = {
  [SIGN_UP_ERROR]: (state, action) => {
    return fromJS({
      ...state.toJS(), ...{
        signUpError: action.data,
        alert: {
          visible: true,
          style: 'danger',
          message: action.error.response.data.errors.full_messages.join ? action.error.response.data.errors.full_messages.join(',') : action.error.response.data.errors.full_messages
        }
      }
    });
  },

  [SIGN_UP_DATA_CHANGE]: (state, action) => {
    var signUpData = state.toJS().signUpData;
    signUpData[action.data.key] = action.data.value;
    return fromJS({
      ...state.toJS(), 
      signUpData,
    })
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}