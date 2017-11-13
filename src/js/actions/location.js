import axios from 'axios';
import countries from '../constant/countries';
import { changeCountry } from './country';
import { searchVenue } from './venue';
import utils from '../utils';
import axiosClient from '../utils/axiosClient';
import {
  CHANGE_COUNTRY
} from '../actions/country';

export const FETCH_LOCATION = 'FETCH_LOCATION';
export const CHANGE_SEARCH_LOCATION = 'CHANGE_SEARCH_LOCATION';

export function fetchLocation(data) {
  return {
    type: FETCH_LOCATION,
    data
  }
}

export function changeSearchLocation(data) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_SEARCH_LOCATION,
      data
    })
  }
}

export function getLocation(data) {
  return (dispatch) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        axios.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true`)
          .then(response => {
            if (response && response.data) {
              const country = response.data.results.filter(item => item.types.includes('country'))[0];
              // if (country && country.address_components && country.address_components[0]) {
              //   const address = country.address_components[0];
              //   if (address.short_name) {
              //     const currentCountry = countries[address.short_name];
              //     if (currentCountry) {
              //       dispatch(changeCountry(currentCountry));
              //     }
              //   }
              // }
              // const currentLocation = utils.analyzeLocation(response.data.results);
              // dispatch(fetchLocation(currentLocation));
              // const searchData = {
              //   address: currentLocation.address,
              //   info: null,
              //   typeIds: "",
              //   name: ""
              // }
              // dispatch(searchVenue(searchData))
            }
          })
          .catch(error => {
            const result = error.response;
            return Promise.reject(result);
          });
      }, error => {
        console.error(error);
      });
    } else {
      x.error = "Geolocation is not supported by this browser.";
    }
  }
}
