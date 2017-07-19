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

        if (response.rows.length > 0 && (response.rows.filter((e) => e.xid == code).length > 0)) {
            main.db.query("SELECT * FROM langs", [], function (err1, response1) {
                if (err1) {
                    return console.error('error running query', err1);
                }
                if (response1.rows.length > 0 && (response1.rows.filter((e) => e.langname == language).length > 0)) {
                    if (_.has(JSON.parse(response1.rows[0].json, path)) && response.rows[0].admin != 1) {
                        main.utils.sendFormError(res, "You do not have authorisation to overwrite values!", ["code"]);
                    } else {
                        var json = main.utils.setValue(response1.rows[0].json, path, value);
                        main.db.query("UPDATE langs SET json=$1 WHERE langname=$2", [json, language], function (e, r) {
                            if (e) {
                                return console.error('error running query', e);
                            }
                        });
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