const {
    error,
    successful,
    isInside,
    isValidDate,
} = require('../commons');

const qs = require('querystring');

function POST(req, res, collection) {
    if (isInside('/api/v1/events', req.url)) {
        let body = '';
        req
            .on('data', chunk => {
                if (body.length > 1e6) error(res, 'dis body is 2 much 4 u *tongue pop*');
                body += chunk;
            })
            .on('end', () => {
                const {
                    favorite,
                    notes,
                    name,
                    date,
                    hour
                } = qs.parse(body);
                if (name && isValidDate(date) && hour) {
                    collection.insertOne({
                        favorite,
                        notes,
                        name,
                        date,
                        hour: +hour
                    }, err => {
                        successful(res, 'New event reated');
                    });
                } else {
                    error(res, 'Something missing');
                }
            });
    } else {
        error(res, 'invalis path or url')
    }
}

module.exports = POST;