const HomeController = require('./../controllers/HomeController');
const ConnexionController = require('./../controllers/ConnexionController');
const PhotoController = require('./../controllers/PhotoController');
const VipAdminController = require("../controllers/VipAdminController");

module.exports = function (app) {

    //Main Routes
    app.get('/', ConnexionController.Connexion);
    app.get('/accueil', HomeController.Index);

    //Vip
    app.get('/vipAdmin', VipAdminController.Vip);
    app.post('/addVip', VipAdminController.AddVip);
    app.post('/modifyVip', VipAdminController.ModifyVip);

    //Photos
    app.get('/photos', PhotoController.Photo);
}
