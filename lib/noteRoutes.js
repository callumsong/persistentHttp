'use strict';
var fs = require('fs');
module.exports = function(req, res) {
  if (req.method === 'POST') {
    var input = '';

    req.on('data', function(data) {
      input += data.toString('utf-8') + '\n';
    });

    req.on('end', function() {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write('check the file notes.json in the data directory');
      fs.appendFile('./data/notes.json', input, 'utf-8', function (err, data) {
        console.log('file created');
      });
      res.end();
    });
  }
  var notes = fs.readFile('./data/notes.json');
  var notesString = JSON.stringify(notes);
  return notesString;
};