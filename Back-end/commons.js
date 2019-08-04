const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
];

const months = [
    'january', 
    'february',
    'march',
    'april',
    'may', 
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
];

function error(res, err) {
    res.end(JSON.stringify({
        success: false,
        error: err,
        data: null
    }));
}

function successful(res, data) {
    res.end(JSON.stringify({
        success: true,
        error: null,
        data
    }));
}

function setId(id) {
    const ObjectId = require('mongodb').ObjectId;
    return new ObjectId(id);
}

function isInside(string, bigString) {
    return new RegExp(`^${string}`).test(bigString);
}

function queryURL(str) {
    const url = require('url');
    const qs = require('querystring');
    return qs.parse(url.parse(str).query);
}

function isValidDate(date) {
    const parsedDate = date.split('/').map(n => +n);
    parsedDate[0] = parsedDate[0] > 0 && parsedDate[0] <= 12;
    parsedDate[1] = parsedDate[1] > 0 && parsedDate[1] <= 31;
    if(parsedDate[0] && parsedDate[1] && parsedDate[2]) {
        return true;
    }
}

function path(str) {
    const url = require('url');
    return url.parse(str).pathname.split('/');
}


module.exports = {
    setId,
    isValidDate,
    isInside,
    queryURL,
    path,
    months,
    days,
    error,
    successful
};