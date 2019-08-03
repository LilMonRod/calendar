
const methods = {
    POST: require('./methods/post'),
    PUT: require('./methods/put'),
    GET: require('./methods/get'),
    DELETE: require('./methods/delete')
};

const {
    db,
    collection,
    url,
    port
} = require('./conf.json');

const {
    error,
    successful
} = require('./commons');


const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;
const http = require('http');

http.createServer((req, res) => {
    MongoClient.connect(url, {
            useNewUrlParser: true
        })
        .then(connect => {
            const targetDB = connect.db(db);
            const targetCollection = targetDB.collection(collection);

            if (methods[req.method]) {
                methods[req.method](req, res, targetCollection);
            } else if (methods[req.method] === 'OPTIONS') {
                successful(res, 'cool');
            } else {
                error(res, 'Not such method');
            }
        })
        .catch(err => error(res, 'Unable to connect'));
}).listen(port);