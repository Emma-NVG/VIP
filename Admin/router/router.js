const HomeController = require('./../controllers/HomeController');
const ConnexionController = require('./../controllers/ConnexionController');

module.exports = function (app) {

    //Main Routes
    app.get('/', ConnexionController.Connexion);
    app.get('/accueil', HomeController.Index);
}