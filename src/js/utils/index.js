import _ from 'lodash';
import axios from 'axios';
import { isEmpty } from "./validation";

const isValidEmail = (email) => {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var remove = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;
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

const removeVietNameseString = orgStr => {
    var str = orgStr.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g, "-");
    str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
    str = str.replace(/^\-+|\-+$/g, "");
    return str;
}

const utils = {
    isValidEmail,
    getAccessToken,
    isAuthenticated,
    getAllConfigAuthToken,
    getCurrentTimeFromUTC,
    getUTCTimeFromDate,
    formatDate,
    removeVietNameseString,
}

export default utils;

