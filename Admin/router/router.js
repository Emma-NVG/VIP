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
    app.get('/adminVip/:action',getConnected, VipAdminController.Vip);
    //Vip choice
    app.post('/vipChoice',getConnected, VipAdminController.VipInfo);

    /* == Add part == */
    app.post('/addVip',getConnected, VipAdminController.AddVip);

    /* == Modify part == */
    app.post('/modifyVip',getConnected, VipAdminController.ModifyVip);

    /* == Delete part == */
    app.post('/deleteVip/:id',getConnected, VipAdminController.DeleteVip);

    //Photos
    app.get('/adminPhotos/:action',getConnected, PhotoController.adminPhotos);
    app.post('/addPhoto',getConnected, PhotoController.AddPhoto);
    app.post('/deleteChoice',getConnected, PhotoController.InfoPhoto);
    app.post('/deletePhoto',getConnected, PhotoController.DeletePhoto);

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
