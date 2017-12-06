import {
    GET_ALL_PERSON,
    SELECT_CURRENT_PERSON_DASHBOARD
} from "../actions/person";

const initialState = {
    persons: [],
    currentPersonDashboard: null
};

const actionsMap = {
    [GET_ALL_PERSON]: (state, data) => {
        return {
            ...state,
            persons: data
        };
    },
    [SELECT_CURRENT_PERSON_DASHBOARD]: (state, data) => {
        return {
            ...state,
            currentPersonDashboard: data
        };
    }
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action.data) : state;
}
