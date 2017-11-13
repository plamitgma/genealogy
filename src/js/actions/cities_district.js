import axiosClient from '../utils/axiosClient';

export const GET_CITIES = 'GET_CITIES';
export const GET_DISTRICTS_BY_CITY = 'GET_DISTRICTS_BY_CITY';

export function getCities(countryId) {
    return (dispatch) => {
        axiosClient.get(`/cities?country_id=${countryId}`).then(response => {
            return dispatch({
                type: GET_CITIES,
                data: response.data.cities
            })
        })
    }
}

export function getDistrictsByCity(city_id) {
    return (dispatch) => {
        axiosClient.get(`/districts?city_id=${city_id}`).then(response => {
            return dispatch({
                type: GET_DISTRICTS_BY_CITY,
                data: {
                    city_id: city_id,
                    districts: response.data.districts
                }
            })
        })
    }
}
