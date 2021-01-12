const express = require('express')
const app = express()
const responder = require('./responder.js');
const config = require('./server.json');

const hostname = config.host;
const port = config.port;

app.use(express.json());

app.options('/list', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.end();
});

app.get('/list', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.json(responder.list());
});

app.options('/item', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,DELETE');
    res.end();
});

app.put('/item', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'PUT');
    res.json(responder.add(req.body));
});

app.post('/item', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.json(responder.update(req.body));
});

app.delete('/item', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'DELETE');
    res.json(responder.delete(req.query));
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Aborting...');
    });
});