let db = require('../configDb');


module.exports.test = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT COUNT(*) AS NB FROM vip ;";
              // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.repertoireLettre = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT SUBSTR(VIP_NOM,1,1) AS NOM FROM vip ORDER BY 1 ASC ;";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
