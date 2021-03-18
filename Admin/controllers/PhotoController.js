let async = require('async');
let model = require("../models/vipAdmin.js");
let model2 = require("../models/photoAdmin.js");

module.exports.Photo = function (request, response) {
    response.title = "Administration photos";
    async.parallel([
            function (callback) {
                model.getAllVips(function (err, result) {callback(null,result)});
            }
        ],
        function (err,result){
            if(err){
                console.log(err);
                return;
            }
            response.vips = result[0];
            response.render('photosAdmin', response);
        }
    );
};

module.exports.AddPhoto = function (request, response) {
    response.title = "Administration photos";
    async.parallel([
            function (callback) {
                model2.nbPhoto(request.body,function (err, result) {
                    if(err){
                        console.log(err);
                        return;
                    }
                    console.log(result[0]);
                    model2.insertPhoto(result[0],request.body,function (err1, result1) {
                        if(err){
                            console.log(err);
                            return;
                        }
                    });
                    callback(null,result)
                });

            },
        ],
        function (err,result){
            if(err){
                console.log(err);
                return;
            }
            response.redirect('/photos');
        }
    );
};
