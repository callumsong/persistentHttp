'use strict';
var fs = require('fs');
var fileNumber = 0;
module.exports = function(req, res) {
  var myPath = './data/notes.json'
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    var input = '';
    req.on('data', function(data) {
      input += data.toString('utf-8') + '\n';
    });
    req.on('end', function() {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write('check the file notes.json in the data directory');
      fs.writeFile(myPath, input, 'utf-8', function (err, data) {
        console.log('done');
        });
      res.end();
    });
  } else if (req.method === 'GET') {
    var msg = "";
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    fs.readFile(myPath, function (err, data){
      if(err) throw err;
      res.write(data.toString());
    });
    res.end(JSON.stringify({msg: 'returned'}));
  } else if (req.method === 'DELETE') {
    fs.unlinkSync(myPath);
    res.end();
  }
};