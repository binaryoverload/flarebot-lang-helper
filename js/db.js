const pg = require('pg');
var pool;

exports.init = function (callback) {
    pg.defaults.ssl = true;
    var db = process.env.DATABASE_URL;
    var pg_user = db.split(':')[1].replace("//", "");
    var pg_password = db.split(':')[2].split('@')[0];
    var pg_host = db.split(':')[2].split('@')[1];
    var pg_port = db.split(':')[3].split('/')[0];
    var pg_database = db.split(':')[3].split('/')[1];

    var config = {
        user: pg_user, //env var: PGUSER 
        database: pg_database, //env var: PGDATABASE 
        password: pg_password, //env var: PGPASSWORD 
        host: pg_host, // Server hosting the postgres database 
        port: pg_port, //env var: PGPORT 
        max: 10, // max number of clients in the pool 
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed 
    };

    pool = new pg.Pool(config);
    
    callback(pool);

    return pool;

}

exports.destroy = function () {
    pool.end();
}

exports.getLangJSON = function (name, callback) {
    return exports.query("SELECT * FROM langs WHERE langname='" + name + "'", [], callback);
}

exports.query = function (text, values, callback) {
  console.log('query:', text, values);
  return pool.query(text, values, callback);
};