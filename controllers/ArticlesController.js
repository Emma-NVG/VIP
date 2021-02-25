let async = require("async");
let model = require("../models/articles.js")
/////////////////////////// A R T I C L E S

module.exports.ChoixVIP = (request, response) => {
    response.title = "";
    async.parallel([
            (callback) => {
                model.getVIPs((err, result) => {
                    callback(null, result)
                })
            }
        ],
        (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            response.listOfPerson = result[0];
            response.render('articles', response);
        })
}

module.exports.DisplayArticle = (request, response) => {
    response.title = "";
    let data = request.params.numVIP;
    async.parallel([
            (callback) => {
                model.getVIPs((err, result) => {
                    callback(null, result)
                })
            },
            (callback) => {
                model.getArticleDetails(data, (err2, result2) => {
                    callback(null, result2)
                });
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
            response.render('articles', response);
        });
}
