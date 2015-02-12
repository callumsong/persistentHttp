'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var notes = require('../http_server');
var fs = require('fs');

chai.use(chaihttp);

var expect = chai.expect;

describe('posting into JSON', function() {
  var newData = '{}';
  before(function() {
    if(fs.exists('./data/notes.json')) {
      fs.unlinkSync('./data/notes.json');
    }
  });

  after(function() {
    fs.unlinkSync('./data/notes.json');
  });

  it('informs user of the newly created file', function(done) {
    chai.request('localhost:3000')
      .post('/notes')
      .send(newData)
      .end(function(err, res) {
        expect(err).eql(null);
        expect(res.text).eql('check the file notes.json in the data directory');
        done();
      });
  });
});