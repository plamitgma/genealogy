import axiosClient from '../utils/axiosClient';

export const SIGN_UP_DATA_CHANGE = 'SIGN_UP_DATA_CHANGE';

export function handleSignUpDataChange(key, value) {
  return (dispatch) => {
    var data = {key, value};
    return dispatch({
      type: SIGN_UP_DATA_CHANGE,
      data
    })
  }
}
