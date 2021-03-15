let async = require('async');
let model = require("../models/album.js");
let modelImport = require("../models/vip.js");

// ////////////////////// L I S T E R     A L B U M S

module.exports.ListerAlbum = 	function(request, response){
   response.title = 'Album des stars';
    let dataPerson = request.params.detail;
    let dataPhoto = request.params.number;
    console.log(dataPhoto);
    console.log(dataPerson);
    async.parallel([
            function (callback) {
                model.getAllPictures(function(err, result) {callback(null,result)});
            }
            ,
            function (callback) {
               model.getPhotoAndInfo(dataPerson, dataPhoto, function(err1, result1) {callback(null,result1)});
            },
            function (callback) {
                model.getNumberPhotos(dataPerson, function(err2, result2) {callback(null,result2)});
            }
        ],
        function (err,result) {
            if (err) {
                console.log(err);
                return;
            }
            response.galerie = result[0];
            response.albumInfo = result[1]; console.log(result[1]);
            response.max = result[2][0]; console.log(result[2]);
            response.render('listerAlbum', response);
        }
    );
} ;
