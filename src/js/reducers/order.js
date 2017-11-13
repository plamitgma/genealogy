import {
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILED,
    RESET_ORDER_DATA,
    GET_ORDER_HISTORY_FOR_CURRENT_USER,
    GET_ORDER_DETAIL_FOR_CUSTOMER,
    GET_ORDER_HISTORY_FOR_VENUE_OWNER,
    GET_ORDER_DETAIL_FOR_VENUE_OWNER,
    GET_TICKET_BY_ID,
    CHECK_IN_TICKET,
    RESET_ORDER_DETAIL
} from "../actions/order";

import {
    USER_LOUGOUT
} from '../actions/user';

const initialState = {
    createOrderSuccess: null,
    statusCode: null,
    orderHistory: [],
    orderPageInfo: {
        current_page: 1,
        total_count: 0,
        total_pages: 1,
        hasMore: false
    },
    orderHistoryVenueOwner: [],
    venuePageInfo: {
        current_page: 1,
        total_count: 0,
        total_pages: 1,
        hasMore: false
    }
};

const actionsMap = {
    [USER_LOUGOUT]: (state, data) => {
        return {
            ...state,
            orderHistory: [],
            orderHistoryVenueOwner: []
        };
    },
    [CREATE_ORDER_SUCCESS]: (state, data) => {
        return {
            ...state,
            createOrderSuccess: true
        }
    },
    [CREATE_ORDER_FAILED]: (state, data) => {
        return {
            ...state,
            createOrderSuccess: false,
            statusCode: data
        }
    },
    [RESET_ORDER_DATA]: (state, data) => {
        return {
            ...state,
            createOrderSuccess: null
        }
    },
    [GET_ORDER_HISTORY_FOR_CURRENT_USER]: (state, data) => {
        return {
            ...state,
            orderHistory: data.isLoadMore ?
                state.orderHistory.concat(data.orders) : data.orders,
            orderPageInfo: {
                current_page: data.current_page,
                total_count: data.total_count,
                total_pages: data.total_pages,
                hasMore: data.current_page < data.total_pages
            }
        }
    },
    [GET_ORDER_DETAIL_FOR_CUSTOMER]: (state, data) => {
        var orderHistory = state.orderHistory;
        var order = orderHistory.filter(item => {
            return item.id == data.orderId;
        })[0];
        if (order) {
            order.order_details = data.order_details;
        }
        return {
            ...state,
            orderHistory
        }
    },
    [GET_ORDER_HISTORY_FOR_VENUE_OWNER]: (state, data) => {
        return {
            ...state,
            orderHistoryVenueOwner: data.isLoadMore ?
                state.orderHistoryVenueOwner.concat(data.orders) : data.orders,
            venuePageInfo: {
                current_page: data.current_page,
                total_count: data.total_count,
                total_pages: data.total_pages,
                hasMore: data.current_page < data.total_pages
            }
        }
    },
    [GET_ORDER_DETAIL_FOR_VENUE_OWNER]: (state, data) => {
        var orderHistoryVenueOwner = state.orderHistoryVenueOwner;
        var order = orderHistoryVenueOwner.filter(item => {
            return item.id == data.orderId;
        })[0];
        if (order) {
            order.order_details = data.order_details;
        }
        return {
            ...state,
            orderHistoryVenueOwner
        }
    },
    [GET_TICKET_BY_ID]: (state, data) => {
        var orderHistory = [];
        if (data.isVenueOwner) {
            orderHistory = state.orderHistoryVenueOwner;
        } else {
            orderHistory = state.orderHistory;
        }
        var order = orderHistory.filter(item => {
            return item.id == data.orderId;
        })[0];
        if (order) {
            var orderDetail = order.order_details.filter(detail => {
                return detail.id == data.orderDetailId;
            })[0];
            if (orderDetail) {
                orderDetail.ticket = data.ticket;
            }
        }
        if (data.isVenueOwner) {
            return {
                ...state,
                orderHistoryVenueOwner: orderHistory
            }
        }
        return {
            ...state,
            orderHistory
        }
    },
    [CHECK_IN_TICKET]: (state, data) => {
        var orderHistory = state.orderHistoryVenueOwner;
        var order = orderHistory.filter(item => {
            return item.id == data.orderId;
        })[0];
        if (order) {
            var orderDetail = order.order_details.filter(detail => {
                return detail.id == data.orderDetailId;
            })[0];
            if (orderDetail) {
                orderDetail.checkInSuccess = true;
                orderDetail.ticket.status = "checked-in";
            }
        }
        return {
            ...state,
            orderHistoryVenueOwner: orderHistory
        }
    },
    [RESET_ORDER_DETAIL]: (state, data) => {
        var orderHistory = state.orderHistoryVenueOwner;
        var order = orderHistory.filter(item => {
            return item.id == data.orderId;
        })[0];
        if (order) {
            var orderDetail = order.order_details.filter(detail => {
                return detail.id == data.orderDetailId;
            })[0];
            if (orderDetail) {
                orderDetail.checkInSuccess = null;
            }
        }
        return {
            ...state,
            orderHistoryVenueOwner: orderHistory
        }
    }
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action.data) : state;
}
