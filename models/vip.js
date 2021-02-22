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
            let sql = "SELECT VIP_NOM AS NAME,VIP_PRENOM AS FIRSTNAME, PHOTO_ADRESSE AS PHOTO, v.VIP_NUMERO AS NUM FROM vip v JOIN photo p ON v.VIP_NUMERO=p.VIP_NUMERO WHERE SUBSTR(VIP_NOM,1,1)='"+data+"' AND PHOTO_NUMERO=1 ORDER BY 1 ASC ;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

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

module.exports.getPhotoProfile = function(data,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT PHOTO_ADRESSE AS PHOTO FROM photo p "+
                        "JOIN vip v ON p.VIP_NUMERO=v.VIP_NUMERO " +
                        "WHERE v.VIP_NUMERO='"+data+"' AND PHOTO_NUMERO=1;";
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
                        "WHERE v.VIP_NUMERO='"+data+"' ;";
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
                        "WHERE v.VIP_NUMERO='"+data+"' AND PHOTO_NUMERO!=1;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getLiaison = function(data,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT LIAISON_MOTIFFIN AS MOTIF, DATE_EVENEMENT AS DATE, v2.VIP_NOM AS NOM, l.VIP_VIP_NUMERO AS NUM, PHOTO_ADRESSE AS PHOTO, v2.VIP_TEXTE AS TXT FROM liaison l "+
                        "JOIN vip v ON v.VIP_NUMERO=l.VIP_NUMERO "+
                        "JOIN vip v2 ON v2.VIP_NUMERO=l.VIP_VIP_NUMERO "+
                        "JOIN photo p ON p.VIP_NUMERO=v2.VIP_NUMERO "+
                        "WHERE v.VIP_NUMERO='"+data+" ' AND PHOTO_NUMERO=1 "+
                        "UNION "+
                        "SELECT LIAISON_MOTIFFIN AS MOTIF, DATE_EVENEMENT AS DATE,v2.VIP_NOM AS NOM, l.VIP_NUMERO AS NUM, PHOTO_ADRESSE AS PHOTO, v2.VIP_TEXTE AS TXT FROM liaison l "+
                        "JOIN vip v ON v.VIP_NUMERO=l.VIP_VIP_NUMERO "+
                        "JOIN vip v2 ON v2.VIP_NUMERO=l.VIP_NUMERO "+
                        "JOIN photo p ON p.VIP_NUMERO=v2.VIP_NUMERO "+
                        "WHERE v.VIP_NUMERO='"+data+" ' AND PHOTO_NUMERO=1";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getMariage = function(data,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT DATE_EVENEMENT AS DATE, MARIAGE_FIN AS DATEFIN, MARIAGE_LIEU AS LIEU, v2.VIP_NOM AS NOM, v2.VIP_TEXTE AS TXT, m.VIP_VIP_NUMERO AS NUM, PHOTO_ADRESSE AS PHOTO FROM mariage m "+
                        "JOIN vip v ON v.VIP_NUMERO=m.VIP_NUMERO "+
                        "JOIN vip v2 ON v2.VIP_NUMERO=m.VIP_VIP_NUMERO "+
                        "JOIN photo p ON p.VIP_NUMERO=v2.VIP_NUMERO "+
                        "WHERE v.VIP_NUMERO='"+data+"' AND PHOTO_NUMERO=1 "+
                        "UNION "+
                        "SELECT DATE_EVENEMENT AS DATE, MARIAGE_FIN AS DATEFIN, MARIAGE_LIEU AS LIEU,v2.VIP_NOM AS NOM, v2.VIP_TEXTE AS TXT, m.VIP_NUMERO AS NUM, PHOTO_ADRESSE AS PHOTO FROM mariage m "+
                        "JOIN vip v ON v.VIP_NUMERO=m.VIP_VIP_NUMERO "+
                        "JOIN vip v2 ON v2.VIP_NUMERO=m.VIP_NUMERO "+
                        "JOIN photo p ON p.VIP_NUMERO=v2.VIP_NUMERO "+
                        "WHERE v.VIP_NUMERO='"+data+"' AND PHOTO_NUMERO=1 ";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getProfessionMannequin = function(data,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT DEFILE_LIEU AS LIEU, DEFILE_DATE AS DATE, v2.VIP_NOM AS COUTURIER, v2.VIP_NUMERO AS NUM, PHOTO_ADRESSE AS PHOTO, v2.VIP_TEXTE AS TXT FROM mannequin m " +
                        "JOIN vip v ON v.VIP_NUMERO=m.VIP_NUMERO " +
                        "JOIN defiledans dd ON m.VIP_NUMERO=dd.VIP_NUMERO " +
                        "JOIN defile d ON d.DEFILE_NUMERO=dd.DEFILE_NUMERO " +
                        "JOIN couturier c ON c.VIP_NUMERO=d.VIP_NUMERO " +
                        "JOIN vip v2 ON v2.VIP_NUMERO=c.VIP_NUMERO " +
                        "JOIN photo p ON v2.VIP_NUMERO=p.VIP_NUMERO " +
                        "WHERE v.VIP_NUMERO='"+data+" ' AND PHOTO_NUMERO=1";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

//TODO associer mannequin avec defile
module.exports.getProfessionCouturier = function(data,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =  "SELECT DEFILE_LIEU AS LIEU, DEFILE_DATE AS DATE FROM couturier c " +
                        "JOIN vip v ON v.VIP_NUMERO=c.VIP_NUMERO " +
                        "JOIN defile d ON d.VIP_NUMERO=c.VIP_NUMERO " +
                        "WHERE v.VIP_NUMERO='"+data+" '";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getProfessionChanteur = function(data,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =  "SELECT CHANTEUR_SPECIALITE AS SPE, ALBUM_TITRE AS TITRE, ALBUM_DATE AS DATE, MAISONDISQUE_NOM AS MDNOM FROM chanteur c " +
                        "JOIN vip v ON v.VIP_NUMERO=c.VIP_NUMERO " +
                        "JOIN composer co ON co.VIP_NUMERO=c.VIP_NUMERO " +
                        "JOIN album a ON a.ALBUM_NUMERO=co.ALBUM_NUMERO " +
                        "JOIN maisondisque md ON md.MAISONDISQUE_NUMERO=a.MAISONDISQUE_NUMERO " +
                        "WHERE v.VIP_NUMERO='"+data+" '";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getProfessionActeur = function(data,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT FILM_TITRE AS TITRE, FILM_DATEREALISATION AS DATE, v2.VIP_NOM AS REALISATEUR, v2.VIP_NUMERO AS NUMRE, PHOTO_ADRESSE AS PHOTO, v2.VIP_TEXTE AS TXT FROM acteur a "+
                        "JOIN vip v ON v.VIP_NUMERO=a.VIP_NUMERO "+
                        "JOIN joue j ON j.VIP_NUMERO=a.VIP_NUMERO "+
                        "JOIN film f ON f.FILM_NUMERO=j.FILM_NUMERO "+
                        "JOIN realisateur r ON f.VIP_NUMERO=r.VIP_NUMERO "+
                        "JOIN vip v2 ON v2.VIP_NUMERO=r.VIP_NUMERO "+
                        "JOIN photo p ON p.VIP_NUMERO=r.VIP_NUMERO "+
                        "WHERE v.VIP_NUMERO='"+data+" ' AND PHOTO_NUMERO=1 ";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

//TODO associer acteurs avec film
module.exports.getProfessionRealisateur = function(data,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =  "SELECT FILM_TITRE AS TITRE, FILM_DATEREALISATION AS DATE FROM realisateur r " +
                        "JOIN vip v ON v.VIP_NUMERO=r.VIP_NUMERO " +
                        "JOIN film f ON f.VIP_NUMERO=r.VIP_NUMERO " +
                        "WHERE v.VIP_NUMERO='"+data+" '";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};



