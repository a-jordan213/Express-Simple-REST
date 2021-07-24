const express = require('express'); //no file path, its auto
const morgan = require('morgan');

const hostname = 'localhost'; //why same names?
const port = 3000;

const app = express(); // express fn tht returns express server app
app.use(morgan('dev')); //the dev op on screen and log info
app.use(express.json()); //this midware 

app.all('/campsites', (req, res, next) => { //all http verbs, path 1st, then callback fn
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.get('/campsites', (req, res) => {
    res.end('Will send all the campsites to you');
});

app.post('/campsites', (req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
});

app.put('/campsites', (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
});

app.delete('/campsites', (req, res) => {
    res.end('Deleting all campsites');
});

app.get('/capsites:campsitesId', (req, res) => { //echoing back to see id correctly
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`)
});

app.post('/campsites/:campsiteId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
});

app.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}`);
});

app.delete('/campsites/:campsiteId', (req, res) => { //need to restrict to 
    res.end(`Deleting campsite: ${req.params.campsiteId}`); //deleting a specific 
});

app.use(express.static(__dirname + '/public')); //dirspecial variable will refer to abosut path

app.use((req, res) => { //req=request res=response?
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});