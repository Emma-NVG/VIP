let db = require("../configDb")

module.exports.getVIPs = (callback) => {
    db.getConnection((err, connexion) => {
        if (!err) {
            let sql = 'SELECT VIP_NUMERO AS NUM, VIP_NOM AS NAME, VIP_PRENOM AS FIRSTNAME FROM vip ORDER BY 2';
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getArticleDetails = (data, callback) => {
    db.getConnection((err, connexion) => {
        if (!err) {
            let sql = "SELECT VIP_NOM AS NAME, VIP_PRENOM AS FIRSTNAME, ARTICLE_TITRE AS TITRE, ARTICLE_RESUME AS CONTENU, ARTICLE_DATE_INSERT AS DATEPUB " +
                "FROM article a " +
                "INNER JOIN apoursujet s ON a.ARTICLE_NUMERO = s.ARTICLE_NUMERO " +
                "INNER JOIN vip v ON s.VIP_NUMERO = v.VIP_NUMERO " +
                "WHERE v.VIP_NUMERO = '" + data + "';";
            connexion.query(sql, callback);
            connexion.release();
            console.log(sql);
        }
    });
};

module.exports.getPhotoArticle = (data, callback) => {
    db.getConnection((err, connexion) => {
        if (!err) {
            //NORMAL
        }
    })
}