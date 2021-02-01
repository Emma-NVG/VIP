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
            let sql = "SELECT DISTINCT SUBSTR(VIP_NOM,1,1) AS FIRST_LETTER_NAME FROM vip ORDER BY 1 ASC ;";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.listPerson = function(data,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT VIP_NOM AS NAME,VIP_PRENOM AS FIRSTNAME, PHOTO_ADRESSE AS PHOTO FROM vip v JOIN photo p ON v.VIP_NUMERO=p.VIP_NUMERO WHERE SUBSTR(VIP_NOM,1,1)='"+data+"' AND PHOTO_NUMERO=1 ORDER BY 1 ASC ;";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
