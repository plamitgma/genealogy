import {
    GET_INVOICES,
    GET_INVOICE_DETAIL_BY_ID
} from "../actions/invoice";

import {
    USER_LOUGOUT
} from '../actions/user';

const initialState = {
    invoices: [],
    invoicePageInfo: {
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
            invoices: []
        };
    },
    [GET_INVOICES]: (state, data) => {
        return {
            ...state,
            invoices: data.isLoadMore ?
                state.invoices.concat(data.invoices) : data.invoices,
            invoicePageInfo: {
                current_page: data.current_page,
                total_count: data.total_count,
                total_pages: data.total_pages,
                hasMore: data.current_page < data.total_pages
            }
        }
    },
    [GET_INVOICE_DETAIL_BY_ID]: (state, data) => {
        var invoices = state.invoices;
        var invoice = invoices.filter(item => {
            return item.id == data.invoiceId;
        })[0];
        if (invoice) {
            invoice.invoice_detail = data.invoice_detail;
        }
        return {
            ...state,
            invoices
        }
    }
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action.data) : state;
}
