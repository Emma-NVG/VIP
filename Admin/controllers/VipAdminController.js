let async = require('async');
let model = require("../models/vipAdmin.js");

module.exports.Vip = function (request, response) {
    response.title = "Administration Vips";
    async.parallel([
            function (callback) {
                model.getAllNationalities(function (err, result) {callback(null,result)});
            },
            function (callback) {
                model.getAllVips(function (err1, result1) {callback(null,result1)});
            }
        ],
        function (err,result){
            if(err){
                console.log(err);
                return;
            }
            response.nationalities = result[0];
            response.vips = result[1];
            response.render('vipAdmin', response);
        }
    );
};

/*===== Addition vip =====*/
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
                    callback(null,result)
                });
            }
        ],
        function (err,result){
            if(err){
                console.log(err);
                return;
            }
            response.redirect('/vipAdmin');
        }
    );
};


/*===== Modification vip =====*/
module.exports.VipInfo = function (request, response) {
    response.title = "Modification Vips";
    async.parallel([
            function (callback) {
                model.getAllNationalities(function (err, result) {callback(null,result)});
            },
            function (callback) {
               model.getVip(request.body.vip, function (err1, result1) {callback(null,result1)});
            }
        ],
        function (err,result){
            if(err){
                console.log(err);
                return;
            }
            response.nationalities = result[0];
            response.vipSelected = result[1];
            response.render('vipAdmin', response);
        }
    );
};

module.exports.ModifyVip = function (request, response) {
    response.title = "Modification of vip in database";
    console.log(request.body)
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
            response.redirect('/vipAdmin');
        }
    );
};

/*===== Deletion vip =====*/
module.exports.DeleteVip = function (request, response) {
    response.title = "Deletion Vips";
    async.parallel([
            function (callback) {
                model.deletePhotos(request.body,function (err, result) {callback(null,result)});
            },
            function (callback) {
                model.deleteVip(request.body,function (err1, result1) {callback(null,result1)});
            }
        ],
        function (err,result){
            if(err){
                console.log(err);
                return;
            }
            response.redirect('/vipAdmin');
        }
    );
};
