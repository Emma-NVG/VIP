let async = require('async');
let model = require("../models/album.js");
let modelImport = require("../models/vip.js");

// ////////////////////// L I S T E R     A L B U M S

module.exports.ListerAlbum = 	function(request, response){
   response.title = 'Album des stars';
    let dataPerson = request.params.detail;
    let dataPhoto = request.params.number;
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
            response.albumInfo = result[1];

            //if no vip has been selected in the album
            if (response.albumInfo != null){
                response.max = result[2][0];
            }
            response.render('listerAlbum', response);
        }
    );
} ;
