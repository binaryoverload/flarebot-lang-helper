var _ = require('lodash');

exports.setValue = function (obj, path, value) {
    obj = JSON.parse(obj);
    return _.set(obj, path, value);
}

exports.sendFormError = function (res, message, fields) {
    res.status(400);
    res.type("application/json")
    res.send({
        "message": message,
        "fields": fields,
    });
}