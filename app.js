/*jshint node:true*/

var express = require("express");
var bodyParser = require('body-parser');
var apiv1 = require('./routes/apiv1.js');
var path = require('path');

var host = process.env.PORT ? '0.0.0.0' : 'localhost';
var port = (process.env.PORT || 3456);
var url = require('url').format({hostname: host, port: port, protocol: 'http'});

var app = express();
app.use('/static', express.static('build'));

app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use('/api/v1/', apiv1.router);

var http = require('http');
var server = http.createServer(app);
server.listen(port, function () {
    console.log('Weather Report listening on ' + url);
});

// Serve index.html by default
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'client', 'index.html')));
