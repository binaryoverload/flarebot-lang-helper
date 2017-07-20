var _ = require('lodash');

exports.setValue = function (obj, path, value) {
    obj = JSON.parse(obj);
    return _.set(obj, path, value);
}

exports.sendFormError = function (res, fields) {
    res.status(400);
    res.type("application/json")
    res.send({
        "fields": fields,
    });
}

exports.checkAuthCode = function (response, code) {
    return response.rows.length > 0 && (response.rows.filter((e) => e.xid == code).length > 0);
}

exports.checkLang = function (response, language) {
    return response.rows.length > 0 && (response.rows.filter((e) => e.langname == language).length > 0)
}

exports.checkUsageAndDecrement = function (db, response, code) {
    var usageResult = false;
    var expiryResult = false;
    if (exports.checkAuthCode(response, code)) {
        if (response.rows[0].admin == 1) {
            return true;
        }
        var usages = response.rows[0].usages;
        if (usages != null) {
            if (usages == 0) {
                usageResult = false;
            } else {
                usages -= 1;
                db.query("UPDATE authcodes SET usages=$1 WHERE xid=$2", [usages, code], function (e, r) {
                    if (e) {
                        return console.error('Error running query', e);
                    }
                });
                usageResult = true;
            }
        } else {
            usageResult = true;
        }

        var expiry = response.rows[0].expiry;
        if (expiry != null) {
            if (expiry > new Date()) {
                expiryResult = true;
            } else {
                expiryResult = false;
            }
        } else {
            expiryResult = true;
        }
    }
    if (!(expiryResult && usageResult)) {
        db.query("DELETE FROM authcodes WHERE xid=$1", [code], function (e, r) {
            if (e) {
                return console.error('Error running query', e);
            }
        });
    }
    return expiryResult && usageResult;
}