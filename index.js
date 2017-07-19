// Lib setup
const express = require('express');
const exphbs = require('express-handlebars');
const xid = require('xid');
const unirest = require('unirest');
const bodyParser = require('body-parser');

// Modules
const routes = require('./js/routes');
const db = require('./js/db');
const utils = require("./js/utils");

let app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

var self = {
  "app": app,
  "pool": pool,
  "db": db,
  "xid": xid,
  "utils": utils,
}

var pool = db.init(function(pool) {
  self.pool = pool;
  routes.initRoutes(self);
});

var port = process.env.PORT;

if (!port) {
  port = 8080;
}

app.listen(port, function () {
  console.log('Listening on port ' + port + '!');
})