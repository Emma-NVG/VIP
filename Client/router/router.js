let HomeController = require('./../controllers/HomeController');
let VipController = require('./../controllers/VipController');
let AlbumController = require('./../controllers/AlbumController');
let ArticlesController = require("../controllers/ArticlesController");

/* ======= Routes ======= */
module.exports = function(app){

/* ======= Main Routes ======= */
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

/* ======= VIP ======= */
    app.get('/repertoire', VipController.Repertoire);
    app.get('/listPerson/:firstLetter', VipController.Repertoire);
    app.get('/person/:vipDetails', VipController.Person);

    /* ======= Albums ======= */
    app.get('/album', AlbumController.ListerAlbum);
    app.get('/photoDetail/:detail/:number', AlbumController.ListerAlbum);

    /* ====== Articles ======= */
    app.get('/articles', ArticlesController.ChoixVIP)
    app.get('/articles/:numVIP', ArticlesController.DisplayArticle)

/* ======= NotFound ======= */
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);
};
