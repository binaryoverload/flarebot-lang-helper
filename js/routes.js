var _ = require('lodash');
var http = require("http");
var querystring = require("querystring");

var main;

exports.initRoutes = function (index) {
    main = index;
    index.app.get('/', exports.index)
    index.app.post('/form', exports.form);
    index.app.get('/json', exports.json);
    index.app.get('/generate', exports.generate);
}

exports.form = function (req, res) {
    var language = req.body.lang;
    var path = req.body.path;
    var value = req.body.value;
    var code = req.body.code;

    var errors = {};

    main.db.query("SELECT * FROM authcodes", [], function (err, response) {
        main.db.query("SELECT * FROM langs", [], function (err1, response1) {
            if (err) {
                return console.error('error running query', err);
            }

            if (main.utils.checkAuthCode(response, code)) {
                var row = (response.rows.filter((e) => e.xid == code)[0]);
                if (!main.utils.checkUsageAndDecrement(main.db, response, code)) {
                    errors.code = "That authentication code has expired!";
                } else {
                    if (err1) {
                        return console.error('error running query', err1);
                    }
                    if (main.utils.checkLang(response1, language)) {
                        var row1 = response1.rows[0]
                        if (_.has(JSON.parse(row1.json), path) && row.admin != 1) {
                            errors.code = "You do not have authorisation to overwrite values!";
                        } else {
                            var json = main.utils.setValue(row1.json, path, value);
                            main.db.query("UPDATE langs SET json=$1 WHERE langname=$2", [json, language], function (e, r) {
                                if (e) {
                                    return console.error('Error running query', e);
                                }
                            });
                            res.status(200);
                            res.send({
                                "lang": language,
                                "json": json,
                                "message": "Successfully updated the language file for the language: " + language
                            })
                            return;
                        }
                    } else {
                        errors["select-wrap"] = "Language is invalid!";
                    }

                }
            } else {
                errors.code = "Authentication Code is invalid!";
            }
            if (!res.headerSent) {
                main.utils.sendFormError(res, errors);
            }
        });
    });
}

exports.index = function (req, res) {
    res.render('index', {
        "title": "FlareBot Language File Editor",
        "code": req.query.authcode
    })
}

exports.generate = function (req, res) {
    main.db.query("SELECT * FROM authcodes", [], function (err, response) {
        if (err) {
            return console.error('error running query', err);
        }

        if (response.rows.length >= 20) {
            res.send("There are currently 20 codes registered! You cannot register another one!");
        } else {
            main.pool.connect().then(function (client) {
                var query = {
                    text: "INSERT INTO authcodes(xid, admin) VALUES($1, $2)",
                    values: [main.xid.generateId(), 0]
                }
                client.query(query).catch(e => console.error(e.stack));
                client.release();
            });
            res.send("Generated!");
        }
    });
}


exports.json = function (req, res) {
    main.db.query("SELECT * FROM langs", [], function (err, response) {
        if (err) {
            return console.error('Error running query', err);
        }

        if (main.utils.checkLang(response, req.query.lang)) {
            var row = response.rows[0];
            var json = JSON.parse(row.json);
            res.render('json', {
                "title": "JSON Viewer",
                "lang": req.query.authcode,
                "json": JSON.stringify(json, null, 4)
            });
        } else {
            res.render('error', {
                "Title": "Error",
                "error": "Invalid Language"
            })
        }
    });
}