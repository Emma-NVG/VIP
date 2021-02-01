let async = require('async');
let model = require("../models/vip.js");

// ///////////////////////// R E P E R T O I R E    D E S     S T A R S

module.exports.Repertoire = 	function(request, response) {
    response.title = 'Répertoire des stars';
    let data = request.params.firstLetter;
    async.parallel([
        function (callback) {
            model.repertoireLettre(function (err, result) {callback(null,result)});
        },

        function (callback) {
            model.listPerson(data, function (err2, result2) {callback(null,result2)});
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
            model.repertoireLettre(function (err, result) {callback(null,result)});
        },
        function (callback) {
            model.person(dataPerson,function(err2, result2) {callback(null,result2)});
        }
        ],
        function (err,result) {
            if (err) {
                console.log(err);
                return;
            }
            response.lettre = result[0];
            response.vipPerson = result[1];
            response.render('repertoireVips', response);
        }

    );
}
