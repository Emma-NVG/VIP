let db = require('../configDb');

/*======== ADD PART ========*/

//get all nationalities of table nationalite
module.exports.getAllNationalities = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT NATIONALITE_NUMERO AS NATNUM, NATIONALITE_NOM AS NATNOM FROM nationalite";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

//insert a vip into database
module.exports.insertVip = function(data, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let d = new Date();
            let date_insertion = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();

            let sql = "INSERT INTO vip (NATIONALITE_NUMERO, VIP_NOM, VIP_PRENOM, VIP_SEXE, VIP_NAISSANCE, VIP_TEXTE, VIP_DATE_INSERTION) VALUES ("+ data.nat+", '"+data.name.toUpperCase()+ "', '"+data.fname+"', '"+data.sex+"', '"+data.date+"', '"+data.com+"', '"+date_insertion+"')";
            connexion.query(sql, callback);console.log(sql);
            connexion.release();
        }
    });
};

//insert a photo into database
module.exports.insertPhoto = function(id,data, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "INSERT INTO photo (PHOTO_NUMERO,VIP_NUMERO, PHOTO_SUJET, PHOTO_COMMENTAIRE, PHOTO_ADRESSE) VALUES (1,"+id+", '"+data.subject+ "', '"+data.com_img+"', '"+data.img+"')";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};


/*======== MODIFY PART ========*/

//getAllVips
module.exports.getAllVips = (callback) => {
    db.getConnection((err, connexion) => {
        if (!err) {
            let sql = "SELECT VIP_NUMERO AS NUM, VIP_NOM AS NAME, VIP_PRENOM AS FNAME FROM vip ORDER BY 2";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

//get a vip from id
module.exports.getVip = function(data,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT VIP_NOM AS NAME,VIP_PRENOM AS FIRSTNAME, VIP_NAISSANCE AS DATE, VIP_TEXTE AS TXT, VIP_SEXE AS SEXE, VIP_NUMERO AS NUM, NATIONALITE_NUMERO AS NAT FROM vip v " +
                "WHERE v.VIP_NUMERO='"+data+"' ;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

//modify a vip into database
module.exports.modifyVip = function(data, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "UPDATE vip SET " +
                "NATIONALITE_NUMERO = "+ data.nat +", " +
                "VIP_NOM = '"+ data.name +"', " +
                "VIP_PRENOM = '"+ data.fname +"', " +
                "VIP_SEXE = '"+ data.sex +"', " +
                "VIP_NAISSANCE = '"+ data.date +"', " +
                "VIP_TEXTE = '"+ data.com +"' " +
                "WHERE VIP_NUMERO = "+data.id+"";
            console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

/*======== DELETE PART ========*/
module.exports.deletePhotos = function(data, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "DELETE FROM `photo` WHERE `photo`.`VIP_NUMERO` = "+data+"";

            connexion.query(sql, callback);
        }
    });
};

module.exports.deleteVip = function(data, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "DELETE FROM vip WHERE vip.VIP_NUMERO = "+data+"";
            connexion.query(sql, callback);
        }
    });
};
