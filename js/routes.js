exports.initRoutes = function(app) {
    app.get('/', exports.index)
    app.post('/form', exports.form);
}

exports.form = function(req, res) {
    res.send("Hello!");
}

exports.index = function(req, res) {
    res.render('index')
}