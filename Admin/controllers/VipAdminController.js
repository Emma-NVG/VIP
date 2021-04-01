let async = require('async');
let model = require("../models/vipAdmin.js");

module.exports.Vip = function (request, response) {
    response.title = "Administration Vips";
    let action = request.params.action;
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
            switch (action){
                case "A": response.render('vip/additionVip', response);
                    break;
                case "M": response.render('vip/modificationVip', response);
                    break;
                case "D": response.render('vip/deleteVip', response);
                    break;
                default: response.render('notFound', response);
                    break;
            }

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
            response.redirect('/adminVip/A');
        }
    );
};


/*===== Modification vip =====*/
module.exports.VipInfo = function (request, response) {
    response.title = "Modification/Suppression Vips";
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

            if (request.body.action == "M"){
                response.render('vip/modificationVip', response);
            }else{
                response.render('vip/deleteVip', response);
            }
        }
    );
};

module.exports.ModifyVip = function (request, response) {
    response.title = "Modification of vip in database";
    async.parallel([
            function (callback) {
                model.modifyVip(request.body,function (err, result) {callback(null,result)}); //TODO remove async
            }
        ],
        function (err,result){
            if(err){
                console.log(err);
                return;
            }
            response.redirect('/adminVip/M');
        }
    );
};

/*===== Deletion vip =====*/
module.exports.DeleteVip = function (request, response) {
    response.title = "Deletion Vips";
    let id = request.params.id;
    console.log(id);
    async.parallel([
            function (callback) {
                model.deletePhotos(id,function (err, result) {callback(null,result)});
            },
            function (callback) {
                model.deleteVip(id,function (err1, result1) {callback(null,result1)});
            }
        ],
        function (err,result){
            if(err){
                console.log(err);
                return;
            }
            response.redirect('/adminVip/D');
        }
    );
};
