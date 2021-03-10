const HomeController = require('./../controllers/HomeController');

module.exports = function (app) {

    //Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);
}