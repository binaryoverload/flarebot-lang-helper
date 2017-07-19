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

        if (response.rows.length > 0 && response.rows.includes(code)) {

        } else {
            res.status(400);
            res.type("application/json")
            res.send({
                "message": "Authentication Code is invalid!",
                "fields": [
                    "code",
                ],
            })
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
            main.pool.connect().then(function(client) {
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