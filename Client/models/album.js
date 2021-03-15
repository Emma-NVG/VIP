let db = require('../configDb');

module.exports.getAllPictures = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT v.VIP_NUMERO AS NUM, PHOTO_ADRESSE AS PIC FROM vip v "+
                        "JOIN photo p ON p.VIP_NUMERO=v.VIP_NUMERO "+
                        "WHERE PHOTO_NUMERO=1";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getPhotoAndInfo = function(data,data2,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT v.VIP_NUMERO AS NUM, PHOTO_ADRESSE AS PIC,VIP_NOM AS NAME,VIP_PRENOM AS FIRSTNAME, PHOTO_COMMENTAIRE AS COM, PHOTO_NUMERO AS PICNUM FROM vip v "+
                "JOIN photo p ON p.VIP_NUMERO=v.VIP_NUMERO "+
                "WHERE v.VIP_NUMERO="+data+ " AND PHOTO_NUMERO="+data2+" ";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getNumberPhotos = function(data,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT v.VIP_NUMERO AS NUM, COUNT(PHOTO_NUMERO) AS MAX FROM vip v "+
                "JOIN photo p ON p.VIP_NUMERO=v.VIP_NUMERO "+
                "WHERE v.VIP_NUMERO="+data+ "";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};


