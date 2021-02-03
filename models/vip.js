let db = require('../configDb');

//get all letters that matches the first letter of a vip name in the database
module.exports.repertoireLettre = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT SUBSTR(VIP_NOM,1,1) AS FIRST_LETTER_NAME FROM vip ORDER BY 1 ASC ;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

//get all vip whose name begin with the letter in the paramater
module.exports.getAllVipWithFirstLetter = function(data,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT VIP_NOM AS NAME,VIP_PRENOM AS FIRSTNAME, PHOTO_ADRESSE AS PHOTO FROM vip v JOIN photo p ON v.VIP_NUMERO=p.VIP_NUMERO WHERE SUBSTR(VIP_NOM,1,1)='"+data+"' AND PHOTO_NUMERO=1 ORDER BY 1 ASC ;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getVip = function(data,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT VIP_NOM AS NAME,VIP_PRENOM AS FIRSTNAME, VIP_NAISSANCE AS DATE, VIP_TEXTE AS TXT FROM vip v " +
                        "WHERE v.VIP_NOM='"+data+"' ;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getPhotoProfile = function(data,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT PHOTO_ADRESSE AS PHOTO FROM photo p "+
                        "JOIN vip v ON p.VIP_NUMERO=v.VIP_NUMERO " +
                        "WHERE v.VIP_NOM='"+data+"' AND PHOTO_NUMERO=1;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getNationality = function(data,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT NATIONALITE_NOM AS NAT FROM nationalite n " +
                        "JOIN vip v ON n.NATIONALITE_NUMERO=v.NATIONALITE_NUMERO " +
                        "WHERE v.VIP_NOM='"+data+"' ;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getAllVipPictures = function(data,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT PHOTO_ADRESSE AS PIC FROM photo p " +
                "JOIN vip v ON v.VIP_NUMERO=p.VIP_NUMERO " +
                "WHERE v.VIP_NOM='"+data+"' AND PHOTO_NUMERO!=1;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};


