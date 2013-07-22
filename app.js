var mongoose = require('mongoose')
  , express = require('express')
  , http = require('http')
  , path = require('path')
  , app = express();

// all environments
//app.set('views', __dirname + '/views');
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('yolo'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/views')));
mongoose.connect('mongodb://localhost/OKStartups');

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// routes
require('./routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
