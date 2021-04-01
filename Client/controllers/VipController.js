let async = require('async');
let model = require("../models/vip.js");
let model2 = require("../models/album.js");
/////////////////////////// R E P E R T O I R E    D E S     S T A R S

module.exports.Repertoire = 	function(request, response) {
    response.title = 'Répertoire des stars';
    let firstLetter = request.params.firstLetter;
    async.parallel([
        function (callback) {
            model.repertoireLettre(function (err, result) {callback(null,result)}); //Get all letters if there is a vip with a name whose first letter matches with it
        },

        function (callback) {
            model.getAllVipWithFirstLetter(firstLetter, function (err2, result2) {callback(null,result2)});// Get all vips whose name's first letter matches the letter in parameter
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
    let vip_numero = request.params.vipDetails;
    async.parallel([
        function (callback) {
            model.repertoireLettre(function (err, result) {callback(null,result)}); //get letters for the navigation
        },
        function (callback) {
            model.getVip(vip_numero,function(err2, result2) {callback(null,result2)}); //get a vip information
        },
        function (callback) {
            model.getPhotoProfile(vip_numero,function(err3, result3) {callback(null,result3)}); //get a vip photo profile
        },
        function (callback) {
            model.getNationality(vip_numero,function(err4, result4) {callback(null,result4)}); //get a vip nationality
        },
        function (callback) {
            model.getAllVipPictures(vip_numero,function(err5, result5) {callback(null,result5)});//get all pictures addresses of a vip
        },
        function (callback) {
            model.getLiaison(vip_numero,function(err6, result6) {callback(null,result6)}); //get liaison of a vip
        },
        function (callback) {
            model.getMariage(vip_numero,function(err7, result7) {callback(null,result7)}); //get mariages of a vip
        },
        function (callback) {
            model.getProfessionMannequin(vip_numero,function(err8, result8) {callback(null,result8)}); //get profession of a vip
        },
        function (callback) {
            model.getProfessionCouturier(vip_numero,function(err9, result9) {callback(null,result9)}); //get profession of a vip
        },
        function (callback) {
            model.getProfessionChanteur(vip_numero,function(err10, result10) {callback(null,result10)}); //get profession of a vip
        },
        function (callback) {
            model.getProfessionActeur(vip_numero,function(err11, result11) {callback(null,result11)}); //get profession of a vip
        },
        function (callback) {
            model.getProfessionRealisateur(vip_numero,function(err12, result12) {callback(null,result12)}); //get profession of a vip
        },
        function (callback) {
            model2.getNumberPhotos(vip_numero, function(err13, result13) {callback(null,result13)}); //get number of pictures of vip
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
            response.liaison = result[5];
            response.mariage = result[6];
            response.mannequin = result[7];
            response.couturier = result[8];
            response.chanteur = result[9];
            response.acteur = result[10];
            response.realisateur = result[11];
            response.numberPhotos = result[12][0];
            response.render('repertoireVips', response);
        }
    );
}
