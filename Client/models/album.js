let db = require('../configDb');

/**
 *  @function Get all addresses of the first picture of all vips
 *
 * */
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

/**
 *  @function Get all addresses of the first picture of all vips
 *
 * */
module.exports.getAllPictures = function(callback) {
    db.getConnection(offset,function(err, connexion) {
        if (!err) {
            let sql =   "SELECT v.VIP_NUMERO AS NUM, PHOTO_ADRESSE AS PIC FROM vip v "+
                "JOIN photo p ON p.VIP_NUMERO=v.VIP_NUMERO "+
                "WHERE PHOTO_NUMERO=1 "+
                "LIMIT 0, "+ offset+"";
            connexion.query(sql, callback); console.log(sql);
            connexion.release();
        }
    });
};

/**
 *  @function Get all informations of a picture from a vip id and a photo id
 *
 *  @param vip_numero int : id of the vip
 *  @param photo_numero : id of the photo chosen
 * */
module.exports.getPhotoAndInfo = function(vip_numero,photo_numero,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT v.VIP_NUMERO AS NUM, PHOTO_ADRESSE AS PIC,VIP_NOM AS NAME,VIP_PRENOM AS FIRSTNAME, PHOTO_COMMENTAIRE AS COM, PHOTO_NUMERO AS PICNUM FROM vip v "+
                "JOIN photo p ON p.VIP_NUMERO=v.VIP_NUMERO "+
                "WHERE v.VIP_NUMERO="+vip_numero+ " AND PHOTO_NUMERO="+photo_numero+" ";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

/**
 *  @function Get the number of photos of a vip from its id
 *  @param vip_numero int : the id of the vip
 * */
module.exports.getNumberPhotos = function(vip_numero,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT v.VIP_NUMERO AS NUM, COUNT(PHOTO_NUMERO) AS MAX FROM vip v "+
                "JOIN photo p ON p.VIP_NUMERO=v.VIP_NUMERO "+
                "WHERE v.VIP_NUMERO="+vip_numero+ "";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};


