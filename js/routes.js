var _ = require('lodash');

var main;

exports.initRoutes = function (index) {
    main = index;
    index.app.get('/', exports.index)
    index.app.post('/form', exports.form);
    index.app.get('/generate', exports.generate);
}

exports.form = function (req, res) {
    var language = req.body.lang;
    var path = req.body.path;
    var value = req.body.value;
    var code = req.body.code;

    main.db.query("SELECT * FROM authcodes", [], function (err, response) {
        if (err) {
            return console.error('error running query', err);
        }
        if (main.utils.checkAuthCode(response, code)) {
            var row = (response.rows.filter((e) => e.xid == code)[0]);
            if (!main.utils.checkUsageAndDecrement(main.db, response, code)) {
                main.utils.sendFormError(res, "That authentication code has expired!", ["code"]);
                return;
            }
            main.db.query("SELECT * FROM langs", [], function (err1, response1) {
                if (err1) {
                    return console.error('error running query', err1);
                }
                if (main.utils.checkLang(response1, language)) {
                    var row1 = response1.rows[0]
                    console.log(_.has(JSON.parse(row1.json), path));
                    console.log(row.admin);
                    if (_.has(JSON.parse(row1.json), path) && row.admin != 1) {
                        main.utils.sendFormError(res, "You do not have authorisation to overwrite values!", ["code"]);
                        return;
                    } else {
                        var json = main.utils.setValue(row1.json, path, value);
                        main.db.query("UPDATE langs SET json=$1 WHERE langname=$2", [json, language], function (e, r) {
                            if (e) {
                                return console.error('Error running query', e);
                            }
                        });
                        if (row.admin == 1) {
                            res.status(200);
                            res.send({
                                "json": json,
                                "message": "Successfully updated the language file for the language: " + language
                            })
                        } else {
                            res.status(200);
                            res.send({
                                "message": "Successfully updated the language file for the language: " + language
                            })
                        }
                    }
                } else {
                    main.utils.sendFormError(res, "Language is invalid!", ["select-wrap"]);
                    return;
                }
            });
        } else {
            main.utils.sendFormError(res, "Authentication Code is invalid!", ["code"]);
            return;
        }
    });
}

exports.index = function (req, res) {
    res.render('index', {
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