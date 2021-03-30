let db = require('../configDb');

module.exports.getPwd = function (data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT PASSWD FROM parametres WHERE LOGIN = '"+data+"'";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};