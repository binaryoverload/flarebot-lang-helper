// Lib setup
const express = require('express');
const exphbs  = require('express-handlebars');
const xid = require('xid');
const unirest = require('unirest');

// Modules
const routes = require('./js/routes');
const db = require('./js/db');

db.init();

const app = express();

app.use(express.static('public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

routes.initRoutes(app);

var port = process.env.PORT;

if (!port) {
  port = 8080;
}

app.listen(port, function () {
  console.log('Listening on port ' + port + '!');
})