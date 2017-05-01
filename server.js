var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('certs/ca.key', 'utf8');
var certificate = fs.readFileSync('certs/ca.crt', 'utf8');
var caCert = fs.readFileSync('certs/ca.crt', 'utf8');

var credentials = {
	key: privateKey, 
	cert: certificate, 
	ca: caCert,
	requestCert: true,
  	rejectUnauthorized: false
  };

var express = require('express');
var app = express();

app.get('/cid', function (req, res) {
    req.socket.getPeerCertificate(true);
    res.contentType('application/json');
    res.send({'cid':req.socket.getPeerCertificate(true).subject.CN.toString('base64')});
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);