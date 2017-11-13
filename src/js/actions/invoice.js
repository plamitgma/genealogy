import axiosClient from '../utils/axiosClient';

export const GET_INVOICES = 'GET_INVOICES';
export const GET_INVOICE_DETAIL_BY_ID = 'GET_INVOICE_DETAIL_BY_ID';

export function getInvoices(page, isLoadMore) {
    return (dispatch) => {
        const url = `/venues/invoices`;
        axiosClient.get(`/venues/invoices?per_page=6&page=${page}`)
            .then(response => {
                return dispatch({
                    type: GET_INVOICES,
                    data: {
                        invoices: response.data.invoices,
                        current_page: response.data.current_page,
                        total_count: response.data.total_count,
                        total_pages: response.data.total_pages,
                        isLoadMore
                    }
                })
            })
    }
}

export function getInvoiceDetailById(invoiceId) {
    return (dispatch) => {
        axiosClient.get(`/venues/invoices/${invoiceId}`)
            .then(response => {
                return dispatch({
                    type: GET_INVOICE_DETAIL_BY_ID,
                    data: {
                        invoiceId,
                        invoice_detail: response.data.invoice
                    }
                })
            })
    }
}