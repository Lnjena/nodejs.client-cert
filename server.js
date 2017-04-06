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

// your express configuration here

var httpServer = http.createServer(credentials, app);
var httpsServer = https.createServer(credentials, app);

app.get('/cid', function (req, res) {

    /*** Dump ***/
    //res.send(req.socket.getPeerCertificate(true).raw.toString('base64'));
    //console.log(req.socket.getPeerCertificate(true).raw.toString('base64'));
    //res.contentType('application/json');
    //res.send(util.inspect(req.socket.getPeerCertificate(true).raw.toString('base64'), {colors: true}));

    req.socket.getPeerCertificate(true);
    res.contentType('application/json');
    res.send({'cid':req.socket.getPeerCertificate(true).subject.CN.toString('base64')});

});


httpServer.listen(8080);
httpsServer.listen(8443);