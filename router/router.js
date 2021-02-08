let HomeController = require('./../controllers/HomeController');
let VipController = require('./../controllers/VipController');
let AlbumController = require('./../controllers/AlbumController');
let TestController = require('./../controllers/TestController');
let ArticlesController = require("../controllers/ArticlesController");



// Routes
module.exports = function(app){

  // tests à supprimer
    app.get('/test', TestController.Test);

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

// VIP
    app.get('/repertoire', VipController.Repertoire);
    app.get('/listPerson/:firstLetter', VipController.Repertoire);
    app.get('/person/:vipDetails', VipController.Person);

 // albums
   app.get('/album', AlbumController.ListerAlbum);

   //articles
    app.get('/articles', ArticlesController.ChoixVIP)
    app.get('/articles/:nameVIP', ArticlesController.DisplayArticle)

// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
