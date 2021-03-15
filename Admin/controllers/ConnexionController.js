let async = require("async");
let model = require("../models/connexion.js");

module.exports.Connexion = function (request, response) {
    response.title = "";
    response.render('connexion', response);
}