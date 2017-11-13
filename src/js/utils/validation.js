

export const isEmpty = value => value === undefined || value === null || value === '';

export function getState(message) {
    return isEmpty(message)? null : 'error';
}

export function required(value, errorMessage) {
    if (isEmpty(value)) {
        return errorMessage;
    }
    return null;
}

export function requiredAndIsPositiveNumber(value, msgNull, msgNotNumber) {
    var msg = required (value, msgNull);
    if (!isEmpty(msg)) {
        return msg;
    }
    if (isNaN(value) || parseFloat(value) < 0) {
        return  msgNotNumber;
    }
    return null;
}

export function validateStartTime(startTime, endTime, emptyMessage, invalidMessage) {
    if (isEmpty(startTime)) {
        return emptyMessage;
    } else if  (!isEmpty(endTime) && startTime > endTime) {
        return invalidMessage;
    }

    return null;
}

export function validateStartsTime(startTime, endTime, emptyMessage, invalidMessage, startDate, saleStartTime, saleStartTimeMsg) {
    var msg = validateStartTime(startTime, endTime, emptyMessage, invalidMessage);
    if (!isEmpty(msg)) {
        return msg;
    }
    if (!isEmpty(startDate) && !isEmpty(saleStartTime)) {
        let time = new Date(startDate.toDateString() + ' ' + startTime.toTimeString().substring(0, 8));
        if (time < saleStartTime) {
            return saleStartTimeMsg;
        }
    }
    return null;
}

export function validateEndTime(endTime, startTime, emptyMessage, invalidMessage) {
    if (isEmpty(endTime)) {
        return emptyMessage;
    } else if  (!isEmpty(startTime) && startTime > endTime) {
        return invalidMessage;
    }
    return null;
}


export function validateEndTimeAndCheckPeriod(endTime, startTime, emptyMessage, invalidMessage) {
    if (isEmpty(endTime)) {
        return emptyMessage;
    } else if  (!isEmpty(startTime) && (startTime > endTime || minuteDiff(endTime, startTime) > (24 * 60))) {
        return invalidMessage;
    }
    return null;
}

function minuteDiff(endTime, startTime) {
    var timeDiff = Math.abs(endTime.getTime() - startTime.getTime());
    var diffDays = Math.round(timeDiff / (1000 * 60));
    return diffDays;
}

export function validateEndsTime(endTime, startTime, emptyMessage, invalidMessage, endDate, saleEndTime, saleEndTimeMsg) {
    var msg = validateEndTimeAndCheckPeriod(endTime, startTime, emptyMessage, invalidMessage);
    if (!isEmpty(msg)) {
        return msg;
    }
    if (!isEmpty(endDate) && !isEmpty(saleEndTime)) {
        let time = new Date(endDate.toDateString() + ' ' + endTime.toTimeString().substring(0, 8));
        if (time < saleEndTime) {
            return saleEndTimeMsg;
        }
    }
    return null;
}

export function validateConfirmPassword(confirmPassword, newPassword, emptyMessage, notMatchMessage) {
    if (isEmpty(confirmPassword)) {
        return emptyMessage;
    }
    if (confirmPassword !== newPassword) {
        return notMatchMessage;
    }
    return null;
}


export function checkValidation(validationObj) {
    for(var key in validationObj) {
        if(validationObj[key]) {
            return false;
        }
    }
    return true;
}


