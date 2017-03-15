var connect = require('connect');

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

// Example route
var home = require('./routes/home');
var products = require('./routes/products');
var services = require('./routes/services');
var contact = require('./routes/contact');
var about = require('./routes/about');
var productcategory = require('./routes/productcategory');
var actualproduct = require('./routes/actualproduct');

var p9000 = require('./routes/p9000');
var SVG8X = require('./routes/SVG8X');
var v2000 = require('./routes/v2000');
var v3000 = require('./routes/v3000');
var p7000 = require('./routes/p7000');
var p900030 = require('./routes/p900030');
var SVG8XScrub = require('./routes/SVG8XScrub');
var LiftOffSystem = require('./routes/LiftOffSystem');
var v1000 = require('./routes/v1000');
var v1020 = require('./routes/v1020');
var s500010 = require('./routes/s500010');
var s500030 = require('./routes/s500030');
var SVG8X = require('./routes/SVG8X');






var dashboard = require('./routes/dashboard');



// var user = require('./routes/user');

var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', home.view);
app.get('/products', products.view);
app.get('/productcategory', productcategory.view);
app.get('/actualproduct', actualproduct.view);
app.get('/services', services.view);
app.get('/contact', contact.view);
app.get('/about', about.view);
app.get('/dashboard', dashboard.view);

app.get('/LiftOffSystem', LiftOffSystem.view);
app.get('/p9000', p9000.view);
app.get('/SVG8X', SVG8X.view);
app.get('/v2000', v2000.view);
app.get('/v3000', v3000.view);
app.get('/p7000', p7000.view);
app.get('/p900030', p900030.view);
app.get('/SVG8XScrub', SVG8XScrub.view);
app.get('/v1000', v1000.view);
app.get('/v1020', v1020.view);
app.get('/s500010', s500010.view);
app.get('/s500030', s500030.view);
app.get('/SVG8X', SVG8X.view);













http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
