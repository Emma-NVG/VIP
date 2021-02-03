let async = require('async');
let model = require("../models/vip.js");

/////////////////////////// R E P E R T O I R E    D E S     S T A R S

module.exports.Repertoire = 	function(request, response) {
    response.title = 'Répertoire des stars';
    let data = request.params.firstLetter;
    async.parallel([
        function (callback) {
            model.repertoireLettre(function (err, result) {callback(null,result)});
        },

        function (callback) {
            model.getAllVipWithFirstLetter(data, function (err2, result2) {callback(null,result2)});
        }
        ],

        function (err,result){
            if(err){
                console.log(err);
                return;
            }
            response.lettre = result[0];
            response.listOfPerson = result[1];
            response.render('repertoireVips', response);
        }
    );
}

module.exports.Person = 	function(request, response){
    response.title = 'Vip Details';
    let dataPerson = request.params.vipDetails;
    async.parallel([
        function (callback) {
            model.repertoireLettre(function (err, result) {callback(null,result)}); //get letters for the navigation
        },
        function (callback) {
            model.getVip(dataPerson,function(err2, result2) {callback(null,result2)}); //get a vip information
        },
        function (callback) {
            model.getPhotoProfile(dataPerson,function(err3, result3) {callback(null,result3)}); //get a vip information
        },
        function (callback) {
            model.getNationality(dataPerson,function(err4, result4) {callback(null,result4)}); //get a vip information
        },
        function (callback) {
            model.getAllVipPictures(dataPerson,function(err5, result5) {callback(null,result5)});//get all pictures addresses of a vip
        }
        ],
        function (err,result) {
            if (err) {
                console.log(err);
                return;
            }
            response.lettre = result[0];
            response.vipPerson = result[1];
            response.photoProfile = result[2][0];
            response.nationality = result[3][0];
            response.galerie = result[4];
            response.render('repertoireVips', response);
        }
    );
}
