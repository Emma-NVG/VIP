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

    /* == Add part == */
    app.post('/addVip', VipAdminController.AddVip);

    /* == Modify part == */
    app.post('/vipChoice', VipAdminController.VipInfo);
    app.post('/modifyVip', VipAdminController.ModifyVip);

    /* == Delete part == */
    app.post('/deleteVip', VipAdminController.DeleteVip);

    //Photos
    app.get('/photos', PhotoController.Photo);
    app.post('/addPhoto', PhotoController.AddPhoto);
}
