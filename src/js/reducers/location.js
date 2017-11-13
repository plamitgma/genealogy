import {
  FETCH_LOCATION,
  CHANGE_SEARCH_LOCATION
} from 'actions/location';

import {
  CHANGE_COUNTRY
} from 'actions/country';

const actionsMap = {
  [CHANGE_COUNTRY]: (state, data) => {
    return {
        ...state,
        currentLocation: ""
    }
  },
  [FETCH_LOCATION]: (state, data) => {
    if(state.currentLocation == data)  {
      return state;
    }
    return {
        ...state,
        currentLocation: data.address,
        currentSearch: data
    }
  },
  [CHANGE_SEARCH_LOCATION]:  (state, data) => {
    if(state.currentSearch && state.currentSearch.address == data.address
      && state.currentSearch.name == data.name
      && state.currentSearch.typeIds== data.typeIds )  {
      return state;
    }
    return {
        ...state,
        currentSearch: data
    }
  }
};

export default function reducer(state = { currentLocation: null, currentSearch: {
    address: null,
    info: {},
    typeIds: "",
    name: ""
  } }, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action.data) : state;
}
