
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

const methods = {
    POST: require('./methods/post'),
    PUT: require('./methods/put'),
    GET: require('./methods/get'),
    DELETE: require('./methods/delete')
};



const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
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
                successful(res, 'good');
            } else {
                error(res, 'wrong method');
            }
        })
        .catch(err => error(res, 'Connection failed'));
}).listen(port);