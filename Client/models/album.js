module.exports.getVip = function(data,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT VIP_NOM AS NAME,VIP_PRENOM AS FIRSTNAME, VIP_NAISSANCE AS DATE, VIP_TEXTE AS TXT, VIP_SEXE AS SEXE, VIP_NUMERO AS NUM FROM vip v " +
                "WHERE v.VIP_NUMERO='"+data+"' ;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
