const HomeController = require('./../controllers/HomeController');
const ConnexionController = require('./../controllers/ConnexionController');
const PhotoController = require('./../controllers/PhotoController');
const VipAdminController = require("../controllers/VipAdminController");

module.exports = function (app) {

    //Main Routes
    app.get('/', ConnexionController.Connexion);
    app.get('/accueil', HomeController.Index);

    //Vip
    app.get('/adminVip/:action', VipAdminController.Vip);
    //Vip choice
    app.post('/vipChoice', VipAdminController.VipInfo);

    /* == Add part == */
    app.post('/addVip', VipAdminController.AddVip);

    /* == Modify part == */
    app.post('/modifyVip', VipAdminController.ModifyVip);

    /* == Delete part == */
    app.post('/deleteVip/:id', VipAdminController.DeleteVip);

    //Photos
    app.get('/photos', PhotoController.Photo);
    app.post('/addPhoto', PhotoController.AddPhoto);
    app.post('/deleteChoice', PhotoController.InfoPhoto);
    app.post('/deletePhoto', PhotoController.DeletePhoto);

}
