'use strict';

var http = require('http');
var noteRoutes = require('./lib/noteRoutes.js');

var routes = {};
routes['/notes'] = noteRoutes;

var server = http.createServer(function(req, res) {
  if (typeof(routes[req.url]) === 'function') {
    routes[req.url](req, res);
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html'
    });

    res.write('page not found');
    res.end();
  }
});

server.listen(3000, function() {
  console.log('server listening');
});
