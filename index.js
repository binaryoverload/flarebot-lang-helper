const express = require('express'); 
const xid = require('xid');
const pg = require('pg');
const unirest = require('unirest');

const app = express();

app.use(express.static('public'));

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})