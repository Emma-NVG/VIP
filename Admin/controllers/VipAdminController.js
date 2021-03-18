let async = require('async');
let model = require("../models/vipAdmin.js");

module.exports.Vip = function (request, response) {
    response.title = "Administration Vips";

    async.parallel([
            function (callback) {
                model.getAllNationalities(function (err, result) {callback(null,result)});
            }
        ],

        function (err,result){
            if(err){
                console.log(err);
                return;
            }
            response.nationalities = result[0];
            response.render('vipAdmin', response);
        }
    );
};

module.exports.AddVip = function (request, response) {
    response.title = "Addition of vip in database";
    async.parallel([
            function (callback) {
                model.insertVip(request.body,function (err, result) {
                    if(err){
                        console.log(err);
                        return;
                    }
                    model.insertPhoto(result.insertId,request.body,function (err, result) {
                        if(err){
                            console.log(err);
                            return;
                        }
                    });
                });
            }
        ],

        function (err,result){
            if(err){
                console.log(err);
                return;
            }
            response.render('vipAdmin', response);
        }
    );
};

module.exports.ModifyVip = function (request, response) {
    response.title = "Modification of vip in database";
    async.parallel([
            function (callback) {
                model.modifyVip(request.body,function (err, result) {callback(null,result)});
            }
        ],

        function (err,result){
            if(err){
                console.log(err);
                return;
            }
            response.render('vipAdmin', response);
        }
    );
};
