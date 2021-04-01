let async = require('async');
let model = require("../models/album.js");

// ////////////////////// L I S T E R     A L B U M S

module.exports.ListerAlbum = 	function(request, response){
   response.title = 'Album des stars';
    let vip_numero = request.params.detail;
    let photo_numero = request.params.number;
    async.parallel([
            function (callback) {
                model.getAllPictures(offset,function(err, result) {callback(null,result)}); //Get all pictures of vips
            }
            ,
            function (callback) {
               model.getPhotoAndInfo(vip_numero, photo_numero, function(err1, result1) {callback(null,result1)}); //Get picture of vip and the infos associated
            },
            function (callback) {
                model.getNumberPhotos(vip_numero, function(err2, result2) {callback(null,result2)}); //Get number of pictures of vips and the infos associated
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
