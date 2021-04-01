let db = require('../configDb');

//insert a photo into database
module.exports.insertPhoto = function(numero,data, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "INSERT INTO photo (PHOTO_NUMERO, VIP_NUMERO, PHOTO_SUJET, PHOTO_COMMENTAIRE, PHOTO_ADRESSE) VALUES ("+numero.NB+","+data.vip+", '"+data.subject+ "', '"+data.com_img+"', '"+data.img+"')";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

//nb photos of a vip
module.exports.nbPhoto = function(data, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT COUNT(*)+1 AS NB FROM photo WHERE VIP_NUMERO="+data.vip+"";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

//delete a photo into database
module.exports.deletePhoto = function(data, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "DELETE FROM `photo` WHERE `photo`.`PHOTO_NUMERO`="+data.num+" AND `photo`.`VIP_NUMERO`="+ data.id +"";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

//pull photos of a vip
module.exports.infoPhoto = function(data, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT PHOTO_ADRESSE AS PIC, PHOTO_NUMERO AS PICNUM, VIP_NUMERO AS NUM FROM photo WHERE VIP_NUMERO ="+ data.vip +"";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
