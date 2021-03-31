let express         = require('express'),
    session         = require('express-session'),
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'), //to retrieve post results
    http            = require('http'),
    path            = require('path');

let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('port', 6800);
app.set('views', path.join(__dirname, 'views'));

// static routes, router won't have access to it
app.use(express.static(path.join(__dirname, '../public')));

app.use(cookieParser());

app.use(session({
    secret: 'nC0@#1pM/-0qA1+é',
    name: 'VipNode',
    resave: true,
    saveUninitialized: true
}));

/* these lines allow the direct utilization of session variables in handlebars
 UTILISATION : {{session.MaVariable}}  */
app.use(function(request, response, next){
    response.locals.session = request.session;
    next();
});

let exphbs = require('express-handlebars');
app.set('view engine', 'handlebars'); //name of file extensions
let handlebars  = require('../helpers/handlebars.js')(exphbs); //location of helpers
// helpers : handlebars' extensions

app.engine('handlebars', handlebars.engine);


// loading of router
require('./router/router')(app);


http.createServer(app).listen(app.get('port'), function(){
    console.log('Serveur Node.js en attente sur le port ' + app.get('port'));
});
