let async = require("async");
let model = require("../models/connexion.js");
let Cryptr = require('cryptr');
let cryptr = new Cryptr('MaSuperCleDeChiffrementDeouF');

module.exports.Accueil = function (request, response) {
    response.title = "Accueil connexion";
    response.render('connexion', response);
}

module.exports.Connexion = function (request, response) {
    response.title = "Connexion administration";
    async.parallel([
        function (callback) {
            model.getPwd(request.body.login, function (err, result) {
                callback(null, result)
            });
        }
    ],
    function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.connected = result[0];
        if (result[0][0] !== undefined) {
            if (request.body.password === cryptr.decrypt(result[0][0]['PASSWD'])) {
                request.session.login = request.body.login;
                response.redirect('/accueil');
            }
        }
        response.render('connexion', response);
    });
}

module.exports.Deconnexion = function (request, response) {
    request.session.login = undefined;
    response.redirect('/');
}
