import _ from 'lodash';
import axios from 'axios';
import { isEmpty } from "./validation";

const isValidEmail = (email) => {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;
    return re.test(email);
}

const isAuthenticated = () => {
    if (getAccessToken())
        return true;
    else return false;
}

const getAccessToken = () => {
    //window.localStorage.removeItem('authToken');
    var authToken = window.localStorage.getItem('authToken');
    if (authToken) {
        authToken = JSON.parse(authToken);
        if (authToken && authToken['access-token']) {
            return authToken['access-token'];
        }
    }
    return null;
}

const getAllConfigAuthToken = () => {
    var authToken = window.localStorage.getItem('authToken');
    if (authToken) {
        authToken = JSON.parse(authToken);
        if (authToken && authToken['access-token']) {
            return authToken;
        }
    }
    return null;
}

const getCurrentTimeFromUTC = (date) => {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDay(), date.getHours(), date.getMinutes(), date.getSeconds()));
}

const getUTCTimeFromDate = (date) => {
    return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
        now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
}

const formatDate = date => {
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
}

const utils = {
    isValidEmail,
    getAccessToken,
    isAuthenticated,
    getAllConfigAuthToken,
    getCurrentTimeFromUTC,
    getUTCTimeFromDate,
    formatDate,
}

export default utils;

