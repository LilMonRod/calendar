const {
    error,
    successful,
    isInside,
    path,
    setId
} = require('../commons');

const qs = require('querystring');

function PUT(req, res, collection) {
    if (isInside('/api/v1/events', req.url)) {
        const _id = setId(path(req.url)[4]);
        let body = '';
        req
        .on('data', chunk => {
            if(body.length > 1e6) error(res, 'dis body is 2 much 4 u');
            body += chunk;
        })
        .on('end', () => {
            if(_id) {
                const {favorite, notes, name} = qs.parse(body);
                console.log(favorite, notes, name);
                collection.updateOne({ _id }, 
                    { $set: { favorite, notes, name } }, err => {
                    successful(res, 'Updated whatever');
                });
            } else {
                error(res, 'Id needed');
            }
        });
    } else {
        error(res, 'not such path')
    }
}

module.exports = PUT;