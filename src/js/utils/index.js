import _ from 'lodash';
import axios from 'axios';
import cities_district from '../constant/cities_district';
import {isEmpty} from "./validation";

Date.prototype.addHours = function (hour) {
    let h = parseInt(hour);
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

const getDateWithCustomTimeZone = (dateStr, timeZone) => {
    var a = dateStr.split(/[^0-9]/);
    var date = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]).addHours(timeZone);
    return date;
}

const analyzeLocation = data => {
    const countryCode = getCountryData(data);
    if (countryCode === 'VN') {
        return getLocationInVietNam(data);
    } else {
        const currentRoute = data.filter(item => item.types.includes('route') || item.types.includes('street_address'))[0];
        if (currentRoute && currentRoute.formatted_address) {
            return {
                address: currentRoute.formatted_address,
                info: null
            }
        }
        return {
            address: "",
            info: null
        };
    }
}

const checkPaymentMethods = (name, paymentMethods) => {
    for (let i = 0; i < paymentMethods.length; i++) {
        if (paymentMethods[i].name.indexOf(name) > -1) {
            return true;
        }
        return false;
    }
}

const getLocationInVietNam = data => {
    const currentRoute = data.filter(item => item.types.includes('administrative_area_level_2'))[0];
    if (currentRoute && currentRoute.formatted_address) {
        const arr = _.split(currentRoute.formatted_address, ',', 2);
        let district = arr[0];
        const city = arr[1];
        const cityCode = removeVietNameseWord(city.replace(/\s+/g, "")).toUpperCase();

        let cityName = "";
        let districtName = "";

        if (cities_district[cityCode]) {
            cityName = cities_district[cityCode].name;

            const districtList = cities_district[cityCode].cities;
            if (district.indexOf('District ') > -1) {
                district = district.replace('District ', "");
            }
            const currentDistrict = Object.keys(districtList).filter((key, index) => {
                return _.endsWith(districtList[key], district);
            })[0];
            if (currentDistrict) {
                districtName = districtList[currentDistrict];
            }
        }
        var result = {
            address: (districtName ? (districtName + ", ") : "") + cityName,
            info: {
                cityCode,
                city: cityName,
                district
            },
            name: "",
            typeIds: ""
        }
        return result;
    }
    return {
        address: "",
        info: null,
        name: "",
        typeIds: ""
    };

}

const removeVietNameseWord = (str) => {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}

const getCountryData = data => {
    const countryData = data.filter(item => item.types.includes('country'))[0];
    if (countryData && countryData.address_components && countryData.address_components[0]) {
        const address = countryData.address_components[0];
        if (address.short_name) {
            return address.short_name
        }
    }
    return '';
}

const getCurrentCountryBaseOnIP = () => {
    axios.get(`//freegeoip.net/json/?callback=`, {
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => {
            console.log(JSON.stringify(response.data, null, 2));
        });
}

const analyzeSearchLocation = (data, countryCode) => {
    if (countryCode === 'VN') {
        return {
            text: "",
            info: {
                cityCode: data.cityCode,
                city: data.city,
                district: data.district
            }
        }
        return getLocationInVietNam(data);
    } else {
        return { text: data };
    }
}

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

const getCurrentShoppingCart = () => {
    const currentShoppingCart = window.localStorage.getItem('shoppingCart');
    if (currentShoppingCart) {
        const currentCart = JSON.parse(currentShoppingCart);
        if (currentCart && currentCart.order) {
            return currentCart;
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

const formatDateTimeString = (date, locale) => {
    const formatLanguage = locale || "en-us";
    const options = {
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        month: "short",
        weekday: "long",
        year: "numeric",
    };
    return date.toLocaleTimeString(formatLanguage, options);
}

const getUserNavigationItem = () => {
    if (isAuthenticated()) {
        return [
            {
                iconName: 'user_account.png',
                text: 'home.userProfile.editProfile'
            },
            {
                iconName: 'user_account.png',
                text: 'home.userProfile.userAccount'
            },
            {
                name: 'favouriteVenues',
                iconName: 'favourite.png',
                text: 'home.userProfile.favourites'
            },
            {
                iconName: 'history.png',
                text: 'home.userProfile.history'
            },
            {
                iconName: 'info.png',
                text: 'home.userProfile.info'
            },
            {
                iconName: 'settings.png',
                text: 'home.userProfile.settings'
            }
        ]
    }
    return [
        {
            iconName: 'user_account.png',
            text: 'home.userProfile.login'
        },
        {
            iconName: 'user_account.png',
            text: 'home.userProfile.createAccount'
        },
        {
            iconName: 'user_account.png',
            text: 'home.userProfile.info'
        }
    ]
}

const parseGender = (gender) => {
    if (!gender)
        return '';

    switch (gender) {
        case 'other':
            gender = 0;
            break;
        case 'female':
            gender = 1;
            break;
        case 'male':
            gender = 2;
            break;
    }
    return gender;
}

const formatCurrency = (number, currency) => {
    if (!Number.isNaN(Number(number))) {
        var n = parseFloat(number.toString());
        if (currency === "₫") {
            return n.toFixed(0).replace(/./g, function (c, i, a) {
                return i && c !== "," && ((a.length - i) % 3 === 0) ? '.' + c : c;
            }) + currency;
        } else {
            return currency + n.toFixed(2).replace(/./g, function (c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
            });
        }
    } else if (currency === "₫") {
        return `0${currency}`;
    } else {
        return `${currency}0`;
    }
}

const formatPrice = (number, currency) => {
    if (isEmpty(number)) {
        return '';
    }
    if (!isNaN(number)) {
        var n = parseFloat(number.toString());
        if (currency === "₫") {
            return n.toFixed(0).replace(/./g, function (c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? '.' + c : c;
            });
        } else {
            if ((number + '').indexOf('.') === -1) {
                return n.toFixed(0).replace(/./g, function (c, i, a) {
                    return i && c !== "," && ((a.length - i) % 3 === 0) ? ',' + c : c;
                });
            } else {
                var preDot = parseFloat(number.substr(0, number.indexOf('.')));
                var afterDot = number.substr(number.indexOf('.'), number.length);
                var result = preDot.toFixed(0).replace(/./g, function (c, i, a) {
                    return i && c !== "," && ((a.length - i) % 3 === 0) ? ',' + c : c;
                });
                return result + afterDot;
            }
        }
    } else {
        return number;
    }
}

const utils = {
    checkPaymentMethods,
    analyzeLocation,
    getCurrentCountryBaseOnIP,
    analyzeSearchLocation,
    isValidEmail,
    getAccessToken,
    isAuthenticated,
    getAllConfigAuthToken,
    getCurrentTimeFromUTC,
    getUTCTimeFromDate,
    formatDateTimeString,
    getUserNavigationItem,
    getCurrentShoppingCart,
    getDateWithCustomTimeZone,
    parseGender,
    formatCurrency,
    formatPrice
}

export default utils;

