import {
    SEARCH_PERSON
} from "../actions/searchPerson";

const initialState = {
    persons: [],
    currentSearch: null
};

const actionsMap = {
    [SEARCH_PERSON]: (state, data) => {
        return {
            ...state,
            ...data
        };
    }
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action.data) : state;
}
