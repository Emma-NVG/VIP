let db = require('../configDb');

/**
 *  @function Get all letters that matches the first letter of a vip name in the database
 * */
module.exports.repertoireLettre = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT SUBSTR(VIP_NOM,1,1) AS FIRST_LETTER_NAME FROM vip ORDER BY 1 ASC ;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

/**
 *  @function Get all vip whose name begin with the letter in the parameter
 *  @param letter char : letter chosen to filter vips
 * */
module.exports.getAllVipWithFirstLetter = function(letter,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT VIP_NOM AS NAME,VIP_PRENOM AS FIRSTNAME, PHOTO_ADRESSE AS PHOTO, v.VIP_NUMERO AS NUM FROM vip v JOIN photo p ON v.VIP_NUMERO=p.VIP_NUMERO WHERE SUBSTR(VIP_NOM,1,1)='"+letter+"' AND PHOTO_NUMERO=1 ORDER BY 1 ASC ;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

/**
 *  @function Get name, firstname, date, text, sexe, num of a vip from a vip id
 *  @param vip_numero int : id of the vip
 * */
module.exports.getVip = function(vip_numero,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT VIP_NOM AS NAME,VIP_PRENOM AS FIRSTNAME, VIP_NAISSANCE AS DATE, VIP_TEXTE AS TXT, VIP_SEXE AS SEXE, VIP_NUMERO AS NUM FROM vip v " +
                        "WHERE v.VIP_NUMERO='"+vip_numero+"' ;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

/**
 *  @function Get first picture of a vip from its id
 *  @param vip_numero int : id of the vip
 * */
module.exports.getPhotoProfile = function(vip_numero,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT PHOTO_ADRESSE AS PHOTO FROM photo p "+
                        "JOIN vip v ON p.VIP_NUMERO=v.VIP_NUMERO " +
                        "WHERE v.VIP_NUMERO='"+vip_numero+"' AND PHOTO_NUMERO=1;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

/**
 *  @function Get nationality of a vip from its id
 *  @param vip_numero int : id of the vip
 * */
module.exports.getNationality = function(vip_numero,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT NATIONALITE_NOM AS NAT FROM nationalite n " +
                        "JOIN vip v ON n.NATIONALITE_NUMERO=v.NATIONALITE_NUMERO " +
                        "WHERE v.VIP_NUMERO='"+vip_numero+"' ;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

/**
 *  @function Get all pictures (except first picture) adresses, subject, commentary of a vip from its id
 *  @param vip_numero int : id of the vip
 * */
module.exports.getAllVipPictures = function(vip_numero,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT PHOTO_ADRESSE AS PIC, PHOTO_SUJET AS SUJET, PHOTO_COMMENTAIRE AS COM FROM photo p " +
                        "JOIN vip v ON v.VIP_NUMERO=p.VIP_NUMERO " +
                        "WHERE v.VIP_NUMERO='"+vip_numero+"' AND PHOTO_NUMERO!=1;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

/**
 *  @function Get affairs and informations associated of a vip if it exists from its id
 *  @param vip_numero int : id of the vip
 * */
module.exports.getLiaison = function(vip_numero,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT LIAISON_MOTIFFIN AS MOTIF, DATE_EVENEMENT AS DATE, v2.VIP_NOM AS NOM, l.VIP_VIP_NUMERO AS NUM, PHOTO_ADRESSE AS PHOTO, v2.VIP_TEXTE AS TXT FROM liaison l "+
                        "JOIN vip v ON v.VIP_NUMERO=l.VIP_NUMERO "+
                        "JOIN vip v2 ON v2.VIP_NUMERO=l.VIP_VIP_NUMERO "+
                        "JOIN photo p ON p.VIP_NUMERO=v2.VIP_NUMERO "+
                        "WHERE v.VIP_NUMERO='"+vip_numero+" ' AND PHOTO_NUMERO=1 "+
                        "UNION "+
                        "SELECT LIAISON_MOTIFFIN AS MOTIF, DATE_EVENEMENT AS DATE,v2.VIP_NOM AS NOM, l.VIP_NUMERO AS NUM, PHOTO_ADRESSE AS PHOTO, v2.VIP_TEXTE AS TXT FROM liaison l "+
                        "JOIN vip v ON v.VIP_NUMERO=l.VIP_VIP_NUMERO "+
                        "JOIN vip v2 ON v2.VIP_NUMERO=l.VIP_NUMERO "+
                        "JOIN photo p ON p.VIP_NUMERO=v2.VIP_NUMERO "+
                        "WHERE v.VIP_NUMERO='"+vip_numero+" ' AND PHOTO_NUMERO=1";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

/**
 *  @function Get weddings of a vip if it exists from its id
 *  @param vip_numero int : id of the vip
 * */
module.exports.getMariage = function(vip_numero,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT DATE_EVENEMENT AS DATE, MARIAGE_FIN AS DATEFIN, MARIAGE_LIEU AS LIEU, v2.VIP_NOM AS NOM, v2.VIP_TEXTE AS TXT, m.VIP_VIP_NUMERO AS NUM, PHOTO_ADRESSE AS PHOTO FROM mariage m "+
                        "JOIN vip v ON v.VIP_NUMERO=m.VIP_NUMERO "+
                        "JOIN vip v2 ON v2.VIP_NUMERO=m.VIP_VIP_NUMERO "+
                        "JOIN photo p ON p.VIP_NUMERO=v2.VIP_NUMERO "+
                        "WHERE v.VIP_NUMERO='"+vip_numero+"' AND PHOTO_NUMERO=1 "+
                        "UNION "+
                        "SELECT DATE_EVENEMENT AS DATE, MARIAGE_FIN AS DATEFIN, MARIAGE_LIEU AS LIEU,v2.VIP_NOM AS NOM, v2.VIP_TEXTE AS TXT, m.VIP_NUMERO AS NUM, PHOTO_ADRESSE AS PHOTO FROM mariage m "+
                        "JOIN vip v ON v.VIP_NUMERO=m.VIP_VIP_NUMERO "+
                        "JOIN vip v2 ON v2.VIP_NUMERO=m.VIP_NUMERO "+
                        "JOIN photo p ON p.VIP_NUMERO=v2.VIP_NUMERO "+
                        "WHERE v.VIP_NUMERO='"+vip_numero+"' AND PHOTO_NUMERO=1 ";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

/**
 *  @function Get infos of profession model of a vip if it exists from its id
 *  @param vip_numero int : id of the vip
 * */
module.exports.getProfessionMannequin = function(vip_numero,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT DEFILE_LIEU AS LIEU, DEFILE_DATE AS DATE, v2.VIP_NOM AS COUTURIER, v2.VIP_NUMERO AS NUM, PHOTO_ADRESSE AS PHOTO, v2.VIP_TEXTE AS TXT FROM mannequin m " +
                        "JOIN vip v ON v.VIP_NUMERO=m.VIP_NUMERO " +
                        "JOIN defiledans dd ON m.VIP_NUMERO=dd.VIP_NUMERO " +
                        "JOIN defile d ON d.DEFILE_NUMERO=dd.DEFILE_NUMERO " +
                        "JOIN couturier c ON c.VIP_NUMERO=d.VIP_NUMERO " +
                        "JOIN vip v2 ON v2.VIP_NUMERO=c.VIP_NUMERO " +
                        "JOIN photo p ON v2.VIP_NUMERO=p.VIP_NUMERO " +
                        "WHERE v.VIP_NUMERO='"+vip_numero+" ' AND PHOTO_NUMERO=1";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

/**
 *  @function Get infos of profession dressmaker of a vip if it exists from its id
 *  @param vip_numero int : id of the vip
 * */
module.exports.getProfessionCouturier = function(vip_numero,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =  "SELECT DEFILE_LIEU AS LIEU, DEFILE_DATE AS DATE FROM couturier c " +
                        "JOIN vip v ON v.VIP_NUMERO=c.VIP_NUMERO " +
                        "JOIN defile d ON d.VIP_NUMERO=c.VIP_NUMERO " +
                        "WHERE v.VIP_NUMERO='"+vip_numero+" '";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

/**
 *  @function Get infos of profession singer of a vip if it exists from its id
 *  @param vip_numero int : id of the vip
 * */
module.exports.getProfessionChanteur = function(vip_numero,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =  "SELECT CHANTEUR_SPECIALITE AS SPE, ALBUM_TITRE AS TITRE, ALBUM_DATE AS DATE, MAISONDISQUE_NOM AS MDNOM FROM chanteur c " +
                        "JOIN vip v ON v.VIP_NUMERO=c.VIP_NUMERO " +
                        "JOIN composer co ON co.VIP_NUMERO=c.VIP_NUMERO " +
                        "JOIN album a ON a.ALBUM_NUMERO=co.ALBUM_NUMERO " +
                        "JOIN maisondisque md ON md.MAISONDISQUE_NUMERO=a.MAISONDISQUE_NUMERO " +
                        "WHERE v.VIP_NUMERO='"+vip_numero+" '";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

/**
 *  @method Get infos of profession actor of a vip if it exists from its id
 *  @param vip_numero int : id of the vip
 * */
module.exports.getProfessionActeur = function(vip_numero,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT FILM_TITRE AS TITRE, FILM_DATEREALISATION AS DATE, v2.VIP_NOM AS REALISATEUR, v2.VIP_NUMERO AS NUMRE, PHOTO_ADRESSE AS PHOTO, v2.VIP_TEXTE AS TXT FROM acteur a "+
                        "JOIN vip v ON v.VIP_NUMERO=a.VIP_NUMERO "+
                        "JOIN joue j ON j.VIP_NUMERO=a.VIP_NUMERO "+
                        "JOIN film f ON f.FILM_NUMERO=j.FILM_NUMERO "+
                        "JOIN realisateur r ON f.VIP_NUMERO=r.VIP_NUMERO "+
                        "JOIN vip v2 ON v2.VIP_NUMERO=r.VIP_NUMERO "+
                        "JOIN photo p ON p.VIP_NUMERO=r.VIP_NUMERO "+
                        "WHERE v.VIP_NUMERO='"+vip_numero+" ' AND PHOTO_NUMERO=1 ";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

/**
 *  @method Get infos of profession film director of a vip if it exists from its id
 *  @param vip_numero int : id of the vip
 * */
module.exports.getProfessionRealisateur = function(vip_numero,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =  "SELECT FILM_TITRE AS TITRE, FILM_DATEREALISATION AS DATE FROM realisateur r " +
                        "JOIN vip v ON v.VIP_NUMERO=r.VIP_NUMERO " +
                        "JOIN film f ON f.VIP_NUMERO=r.VIP_NUMERO " +
                        "WHERE v.VIP_NUMERO='"+vip_numero+" '";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};



