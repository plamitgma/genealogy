import {
    CHANGE_COUNTRY,
    FETCH_COUNTRY,
    CHANGE_LANGUAGE,
    GET_COUNTRIES,
    GET_CITIES,
    GET_DISTRICTS,
    GET_COUNTRY_FROM_COOKIES
} from '../actions/country';

const actionsMap = {
    [CHANGE_COUNTRY]: (state, data) => {
        if (state.currentCountry && state.currentCountry.countryCode === data.countryCode) {
            return state;
        }
        return Object.assign({}, state, {
            currentCountry: data,
            currentLanguage: data.languages.default
        });
    },
    [GET_COUNTRY_FROM_COOKIES] : (state, data) => {
        return Object.assign({}, state, {
            currentCountry: data.currentCountry,
            currentLanguage: data.currentLanguage
        });
    },

    [FETCH_COUNTRY]: (state, data) => {
        return Object.assign({}, state, {
            currentCountry: data,
            currentLanguage: data.languages.default
        });
    },

    [CHANGE_LANGUAGE]: (state, data) => {
        if (state.currentLanguage && state.currentLanguage.languageCode === data.languageCode) {
            return state;
        }
        return {
            ...state,
            currentLanguage: data
        }
    },

    [GET_COUNTRIES]: (state, data) => {
        return Object.assign({}, state, {
            countries: data
        });
    }
};

export default function reducer(state = {currentCountry: null, currentLanguage: null, countries: []}, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action.data) : state;
}
