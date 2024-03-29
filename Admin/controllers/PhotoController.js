let async = require('async');
let model = require("../models/vipAdmin.js");
let model2 = require("../models/photoAdmin.js");

module.exports.adminPhotos = function (request, response) {
    response.title = "Administration photos";
    let action = request.params.action;
    model.getAllVips(function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.vips = result;
            if (action == "A") {
                response.render('photos/additionPhoto', response);
            } else {
                response.render('photos/deletionPhoto', response);
            }

        }
    );
};

module.exports.AddPhoto = function (request, response) {
    response.title = "Administration photos";
    async.parallel([
            function (callback) {
                model2.nbPhoto(request.body, function (err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    model2.insertPhoto(result[0], request.body, function (err1, result1) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                    });
                    callback(null, result)
                });

            },
        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.redirect('/adminPhotos/A');
        }
    );
};

module.exports.InfoPhoto = function (request, response) {
    response.title = "Deletion photos";
    model2.infoPhoto(request.body, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.choiceVip = result[0];
            response.id = request.body.vip;
            response.render('photos/deletionPhoto', response);
        }
    );
};

//
module.exports.DeletePhoto = function (request, response) {
    response.title = "Deletion photos";

    for (const i of request.body.picture){
        async.parallel([
                function (callback) {
                    request.body.num = i;
                },
                function (callback) {
                    model2.infoPhoto(request.body, function (err, result) {
                        callback(null, result)
                    });
                }
            ],
            function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }

                response.redirect('adminPhoto/D');
            }
        );

    }
    response.redirect('/adminPhotos/D');
};
