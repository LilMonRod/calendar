const {
    error,
    successful,
    isInside,
    path,
    setId
} = require('../commons');

function DELETE(req, res, collection) {
    console.log(path(req.url)[4]);
    if (isInside('/api/v1/events', req.url)) {
        const _id = setId(path(req.url)[4]);
        if(_id) {
            collection.deleteOne({ _id }, err => {
                successful(res, 'Deleted whatever');
            });
        } else {
            error(res, 'Id needed');
        }
    } else {
        error(res, 'not such path')
    }
}

module.exports = DELETE;