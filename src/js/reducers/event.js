import {
    GET_LATEST_EVENT
} from "../actions/event";

const initialState = {
    latestEvents: []
};

const actionsMap = {
    [GET_LATEST_EVENT]: (state, data) => {
        return {
            ...state,
            latestEvents: data
        }
    },
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action.data) : state;
}
