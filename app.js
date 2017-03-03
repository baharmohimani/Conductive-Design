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


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
