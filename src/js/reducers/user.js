import {
    CHANGE_USER_DATA
} from "../actions/user";

const initialState = {
    isAuthenticated: false,
    info: null
};

const actionsMap = {
    [CHANGE_USER_DATA]: (state, data) => {
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
