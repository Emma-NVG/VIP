const HomeController = require('./../controllers/HomeController');
const ConnexionController = require('./../controllers/ConnexionController');
const VipController = require('./../controllers/VipController');
const PhotoController = require('./../controllers/PhotoController');

module.exports = function (app) {

    //Main Routes
    app.get('/', ConnexionController.Connexion);
    app.get('/accueil', HomeController.Index);

    //Vip
    app.get('/vips', VipController.Vip);

    //Photos
    app.get('/photos', PhotoController.Photo);
}
