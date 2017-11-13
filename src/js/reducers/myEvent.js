import { Map, fromJS } from 'immutable';

import {
    CREATE_EVENT_SUCCESS,
    CREATE_EVENT_ERROR,
    UPDATE_EVENT_LIST_IN_MY_EVENT,
    UPLOAD_MY_EVENT_PHOTO,
    SELECT_MY_EVENT,
    UPLOAD_EVENT_GALLERY,
    UPDATE_EVENT_GALLERY,
    DELETE_EVENT_GALLERY,
    CHECK_EVENT_VALIDITY,
    CHECK_EVENT_VALIDITY_ERROR
} from "actions/myEvent";

const initialState = fromJS({
    alert: {
        visible: false,
        style: 'danger',
        message: ''
    },
    myEvents: [],
    currentMyEvent: {},
    eventRatingValidity: {}
});

const actionsMap = {
    [CREATE_EVENT_SUCCESS]: (state, action) => {
        return fromJS({
            ...state.toJS(), ...{
                alert: {
                    visible: true,
                    style: 'success',
                    message: 'Create new event successfully.'
                }
            }
        });
    },
    [CREATE_EVENT_ERROR]: (state, action) => {
        return fromJS({
            ...state.toJS(), ...{
                alert: {
                    visible: true,
                    style: 'danger',
                    message: action.error.response.data.errors.full_messages.join ? action.error.response.data.errors.full_messages.join(',') : action.error.response.data.errors.full_messages
                }
            }
        });
    },
    [UPDATE_EVENT_LIST_IN_MY_EVENT]: (state, action) => {
        return fromJS({
            ...state.toJS(), ...{
                myEvents: action.data
            }
        });
    },
    [UPLOAD_MY_EVENT_PHOTO]: (state, action) => {
        let currentMyEvent = state.toJS().currentMyEvent;
        currentMyEvent.photo = action.data.photo + `?vs=${new Date().getTime()}`;
        return fromJS({
            ...state.toJS(), ...{
                currentMyEvent
            }
        });
    },
    [SELECT_MY_EVENT]: (state, action) => {
        return fromJS({
            ...state.toJS(),
            currentMyEvent: action.data
        })
    },
    [UPLOAD_EVENT_GALLERY]: (state, action) => {
        const currentMyEvent = state.toJS().currentMyEvent;
        if (!currentMyEvent.gallery) {
            currentMyEvent.gallery = [];
        }
        currentMyEvent.gallery.push(action.data);
        return fromJS({
            ...state.toJS(),
            currentMyEvent
        })
    },
    [UPDATE_EVENT_GALLERY]: (state, action) => {
        const currentMyEvent = state.toJS().currentMyEvent;
        currentMyEvent.gallery = action.data;
        return fromJS({
            ...state.toJS(),
            currentMyEvent
        })
    },
    [DELETE_EVENT_GALLERY]: (state, action) => {
        const currentMyEvent = state.toJS().currentMyEvent;
        if (currentMyEvent.gallery.length > 0) {
            currentMyEvent.gallery = currentMyEvent.gallery.filter(item => item.id !== data);
        }
        return fromJS({
            ...state.toJS(),
            currentMyEvent
        })
    },
    [CHECK_EVENT_VALIDITY]: (state, action) => {
        return fromJS({
            ...state.toJS(),
            eventRatingValidity: action.data
        })
    },
    [CHECK_EVENT_VALIDITY_ERROR]: (state, action) => {
        return fromJS({
            ...state.toJS(),
            eventRatingValidity: action.data
        })
    },
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
}
