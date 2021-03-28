const HomeController = require  ('./../controllers/HomeController');
const ConnexionController = require('./../controllers/ConnexionController');
const PhotoController = require('./../controllers/PhotoController');
const VipAdminController = require("../controllers/VipAdminController");

module.exports = function (app) {

    //Main Routes
    app.get('/', ConnexionController.Accueil);
    app.post('/connexion', ConnexionController.Connexion)
    app.get('/accueil', getConnected, HomeController.Index);

    //Vip
    app.get('/vipAdmin', getConnected, VipAdminController.Vip);
    app.post('/addVip', getConnected, VipAdminController.AddVip);
    app.post('/modifyVip', getConnected, VipAdminController.ModifyVip);

    //Photos
    app.get('/photos', getConnected, PhotoController.Photo);

    //Deconnexion
    app.get('/deconnexion', ConnexionController.Deconnexion);

    //Middleware
    function getConnected(request, response, next) {
        if(request.session.login !== undefined) {
            next();
        }
        else {
            response.redirect("/");
        }
    }
}
