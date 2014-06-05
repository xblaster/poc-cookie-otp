
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , otpfilter = require('./routes/otpfilter')
  , http = require('http')
  , path = require('path');

var cookieParser = require('cookie-parser')
var session      = require('express-session')

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  app.use(cookieParser()) // required before session.
  app.use(session({
      secret: 'keyboard cat'
    , proxy: true // if you do SSL outside of node.
  }))

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);


  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.all('*', otpfilter.verify);

app.get('/', routes.index);
app.get('/index2', routes.index2);
app.get('/users', user.list);



http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
