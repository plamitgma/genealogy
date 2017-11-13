import axios from 'axios';
import countries from '../constant/countries';
import axiosClient from '../utils/axiosClient';

import { getLatestVenues } from './venue';
import { getLatestEvents } from './event';

export const CHANGE_COUNTRY = 'CHANGE_COUNTRY';
export const FETCH_COUNTRY = 'FETCH_COUNTRY';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_CITIES = 'GET_CITIES';
export const GET_DISTRICTS = 'GET_DISTRICTS';
export const GET_COUNTRY_FROM_COOKIES = 'GET_COUNTRY_FROM_COOKIES';

const DEFAULT_COUNTRY_CODE = 'VN';

export function fetchCountry() {
  return (dispatch) => {
    const getCurrentIp = () => {
      axios.get(`//freegeoip.net/json/?callback=`, {
        headers: { 'Content-Type': 'application/json' }
      }).then(response => {
        const data = countries[response.data.country_code] || countries[DEFAULT_COUNTRY_CODE];
        const config = {
          currentCountry: data,
          currentLanguage: data.languages.default
        }
        window.localStorage.setItem('clientConfig', JSON.stringify(config));
        dispatch(getLatestVenues());
        dispatch(getLatestEvents());

        return dispatch({
          type: FETCH_COUNTRY,
          data
        })
      });
    }
    var config = window.localStorage.getItem('clientConfig');
    if (config) {
      config = JSON.parse(config);
      if (config && config.currentCountry && config.currentLanguage) {
        dispatch(getLatestVenues());
        dispatch(getLatestEvents());

        return dispatch({
          type: GET_COUNTRY_FROM_COOKIES,
          data: config
        })
      } else {
        getCurrentIp();
      }
    }
    else {
      getCurrentIp();
    }
  }
}

export function getCountry() {
  return (dispatch) => {
    axiosClient.get('/countries').then(response => {
      return dispatch({
        type: GET_COUNTRIES,
        data: response.data.countries
      })
    });
  }
}

export function changeCountry(data) {
  return (dispatch) => {
    var config = window.localStorage.getItem('clientConfig');
    if (config) {
      config = JSON.parse(config);
      config = {
        currentCountry: data,
        currentLanguage: data.languages.default
      }
      window.localStorage.setItem('clientConfig', JSON.stringify(config));
    }
    //Always get latest venue and event after change country
    dispatch(getLatestVenues());
    dispatch(getLatestEvents());
    return dispatch({
      type: CHANGE_COUNTRY,
      data
    })
  }
}

export function changeLanguage(data) {
  return (dispatch) => {
    var config = window.localStorage.getItem('clientConfig');
    if (config) {
      config = JSON.parse(config);
      if (config) {
        config.currentLanguage = data;
      } else {
        config = {
          currentLanguage: data
        }
      }
      window.localStorage.setItem('clientConfig', JSON.stringify(config));
    }
    return dispatch({
      type: CHANGE_LANGUAGE,
      data
    })
  }
}
