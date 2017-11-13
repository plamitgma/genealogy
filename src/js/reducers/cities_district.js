
import { Map } from 'immutable';
import countries from '../constant/countries';
import utils from '../utils';

import {
    GET_CITIES,
    GET_DISTRICTS_BY_CITY
} from '../actions/cities_district';

const initialState = {
    cities: []
}

const actionsMap = {
    [GET_CITIES]: (state, data) => {
        return Object.assign({}, state, {
            cities: data,
        });
    },
    [GET_DISTRICTS_BY_CITY]: (state, data) => {
        let newState = Object.assign({}, state, {});
        let currentCity = newState.cities.filter(city => city.id == data.city_id)[0];
        if(!currentCity) {
            return state;
        }
        currentCity.districts = data.districts;
        return newState;
    }
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action.data) : state;
}
