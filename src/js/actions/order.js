import axiosClient from '../utils/axiosClient';

export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';
export const RESET_ORDER_DATA = 'RESET_ORDER_DATA';
export const GET_ORDER_HISTORY_FOR_CURRENT_USER = 'GET_ORDER_HISTORY_FOR_CURRENT_USER';
export const GET_ORDER_DETAIL_FOR_CUSTOMER = 'GET_ORDER_DETAIL_FOR_CUSTOMER';
export const GET_ORDER_HISTORY_FOR_VENUE_OWNER = 'GET_ORDER_HISTORY_FOR_VENUE_OWNER';
export const GET_ORDER_DETAIL_FOR_VENUE_OWNER = 'GET_ORDER_DETAIL_FOR_VENUE_OWNER';
export const GET_TICKET_BY_ID = 'GET_TICKET_BY_ID';
export const CHECK_IN_TICKET = 'CHECK_IN_TICKET';
export const RESET_ORDER_DETAIL = 'RESET_ORDER_DETAIL';

export function createOrder(data) {
    return (dispatch) => {
        axiosClient.post(`/orders`, JSON.stringify(data))
            .then(response => {
                const defaultCart = {
                    order: {
                        venue_id: data.order.venue_id,
                        payment_method_id: 1,
                        status: 1,
                        total: "0",
                        order_details: []
                    }
                }
                window.localStorage.setItem('shoppingCart', JSON.stringify(defaultCart));
                return dispatch({
                    type: CREATE_ORDER_SUCCESS,
                    data: response.data.message
                })
            }).catch(err => {
                return dispatch({
                    type: CREATE_ORDER_FAILED,
                    data: err.response.status
                })
            })
    };
}

export function resetOrderData() {
    return (dispatch) => {
        return dispatch({
            type: RESET_ORDER_DATA,
        })
    }
}

export function getOrderHistoryForCurrentUser(page, isLoadMore) {
    return (dispatch) => {
        axiosClient.get(`/orders/order_history?per_page=15&page=${page}`)
            .then(response => {
                return dispatch({
                    type: GET_ORDER_HISTORY_FOR_CURRENT_USER,
                    data: {
                        orders: response.data.orders,
                        current_page: response.data.current_page,
                        total_count: response.data.total_count,
                        total_pages: response.data.total_pages,
                        isLoadMore
                    }
                })
            })
    }
}

export function getOrderDetailsForCustomer(orderId) {
    return (dispatch) => {
        axiosClient.get(`/orders/${orderId}/order_details?per_page=200`)
            .then(response => {
                return dispatch({
                    type: GET_ORDER_DETAIL_FOR_CUSTOMER,
                    data: {
                        orderId,
                        order_details: response.data.order_details
                    }
                })
            })
    }
}

export function getOrderHistoryForVenueOwner(search_value, page, isLoadMore) {
    return (dispatch) => {
        var url = `/orders/venue_owner?per_page=15&page=${page}`;
        if (search_value) {
            url += `&search_value=${search_value}`;
        }
        axiosClient.get(url)
            .then(response => {
                return dispatch({
                    type: GET_ORDER_HISTORY_FOR_VENUE_OWNER,
                    data: {
                        orders: response.data.orders,
                        current_page: response.data.current_page,
                        total_count: response.data.total_count,
                        total_pages: response.data.total_pages,
                        isLoadMore
                    }
                })
            })
    }
}

export function getOrderDetailsForVenueOwner(orderId) {
    return (dispatch) => {
        axiosClient.get(`/orders/${orderId}/venue_owner/order_details?per_page=200`)
            .then(response => {
                return dispatch({
                    type: GET_ORDER_DETAIL_FOR_VENUE_OWNER,
                    data: {
                        orderId,
                        order_details: response.data.order_details
                    }
                })
            })
    }
}

export function getTicketById(orderId, orderDetailId, ticketId, isVenueOwner) {
    return (dispatch) => {
        axiosClient.get(`/tickets/${ticketId}`)
            .then(response => {
                return dispatch({
                    type: GET_TICKET_BY_ID,
                    data: {
                        orderId,
                        orderDetailId,
                        ticket: response.data.ticket || {},
                        isVenueOwner
                    }
                })
            })
    }
}

export function checkInTicketById(orderId, orderDetailId, ticketId) {
    return (dispatch) => {
        axiosClient.put(`/tickets/${ticketId}/checkin`)
            .then(response => {
                return dispatch({
                    type: CHECK_IN_TICKET,
                    data: {
                        orderId,
                        orderDetailId
                    }
                })
            })
    }
}

export function resetOrderDetail(orderId, orderDetailId) {
    return (dispatch) => {
        return dispatch({
            type: RESET_ORDER_DETAIL,
            data: {
                orderId,
                orderDetailId
            }
        })
    }
}


