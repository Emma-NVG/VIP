let async = require('async');
let model = require("../models/vip.js");

// ///////////////////////// R E P E R T O I R E    D E S     S T A R S

// module.exports.Repertoire = 	function(request, response) {
//     response.title = 'Répertoire des stars';
//     model.repertoireLettre(function (err, result) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         response.lettre = result;
//         response.render('repertoireVips', response);
//     });
// }
//
// module.exports.ListPerson = 	function(request, response) {
//     response.title = 'Liste des stars';
//     let data = request.params.firstLetter;
//     model.listPerson(data,function (err, result) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         response.listOfPerson = result;
//         response.render('repertoireVips', response);
//     });
// }

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

module.exports.ListPerson = 	function(request, response) {
    response.title = 'Liste des stars';
    let data = request.params.firstLetter;

}
