const express = require('express')
const app = express()
const responder = require('./responder.js');
const config = require('./server.json');

const hostname = config.host;
const port = config.port;

app.use(express.json());

function setHeaders(response, methods) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    response.setHeader('Access-Control-Allow-Methods', methods);
}

app.options('/list', (req, res) => {
    setHeaders(res, 'GET');
    res.end();
});

app.get('/list', (req, res) => {
    setHeaders(res, 'GET');
    res.json(responder.list());
});

app.options('/item', (req, res) => {
    setHeaders(res, 'PUT,POST,DELETE');
    res.end();
});

app.put('/item', (req, res) => {
    setHeaders(res, 'PUT');
    res.json(responder.add(req.body));
});

app.post('/item', (req, res) => {
    setHeaders(res, 'POST');
    res.json(responder.update(req.body));
});

app.delete('/item', (req, res) => {
    setHeaders(res, 'DELETE');
    res.json(responder.delete(req.query));
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
