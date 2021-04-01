let async = require("async");
let model = require("../models/articles.js")
/////////////////////////// A R T I C L E S

module.exports.ChoixVIP = (request, response) => {
    response.title = "";
    model.getVIPs((err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        response.listOfPerson = result;
        response.render('articles', response);
    });
}

module.exports.DisplayArticle = (request, response) => {
    response.title = "";
    let vip_numero = request.params.numVIP;
    async.parallel([
            (callback) => {
                model.getVIPs((err, result) => {
                    callback(null, result)
                })
            },
            (callback) => {
                model.getArticleDetails(vip_numero, (err2, result2) => {
                    callback(null, result2)
                });
            },
            (callback) => {
                model.getPhotoArticle(vip_numero, (err3, result3) => {
                    callback(null, result3)
                })
            }
        ],
        (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(result[1]);
            response.listOfPerson = result[0];
            response.vipArticle = result[1];
            response.vipPhoto = result[2];
            response.render('articles', response);
        });
}
