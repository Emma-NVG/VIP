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
            let date_insertion = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
            let sql = "INSERT INTO vip (NATIONALITE_NUMERO, VIP_NOM, VIP_PRENOM, VIP_SEXE, VIP_NAISSANCE, VIP_TEXTE, VIP_DATE_INSERTION) VALUES ("+ data.nat+", '"+data.name+ "', '"+data.fname+"', '"+data.sex+"', '"+data.date+"', '"+data.com+"', '"+date_insertion+"')";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

//insert a photo into database
module.exports.insertPhoto = function(id,data, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            console.log(data.img);
            let sql = "INSERT INTO photo (PHOTO_NUMERO,VIP_NUMERO, PHOTO_SUJET, PHOTO_COMMENTAIRE, PHOTO_ADRESSE) VALUES (1,"+id+", '"+data.subject+ "', '"+data.com_img+"', '"+data.img+"')";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

/*======== MODIFY PART ========*/
//insert a vip into database
module.exports.modifyVip = function(data,id, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "UPDATE vip SET " +
                "NATIONALITE_NUMERO = "+ data.nat +", " +
                "VIP_NOM = '"+ data.name +"', " +
                "VIP_PRENOM = '"+ data.fname +"', " +
                "VIP_SEXE = '"+ data.sex +"', " +
                "VIP_NAISSANCE = '"+ data.date +"', " +
                "VIP_TEXTE = '"+ data.com +"'" +
                "WHERE VIP_NUMERO = "+id+"";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

/*======== DELETE PART ========*/
