var mongoose = require('mongoose')
  , express = require('express')
  , http = require('http')
  , path = require('path')
  , passport = require('passport')
  , app = express()
;

GLOBAL.cake = require('bund-cake')(app)

// all environments
//app.set('views', __dirname + '/views'); //taken care of in routes 
app.use(express.favicon(__dirname + '/public/images/favicon.png')); 
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({uploadDir:__dirname + '/public/images/uploads'}));
app.use(express.methodOverride());
//app.use(express.cookieParser('yolo'));
app.use(express.cookieParser())
app.use(express.session({secret: 'snoop doggy dogg'}));
app.use(passport.initialize());
app.use(passport.session());
app.enable('strict routing'); //has to go above app.use(app.router); this will prevent domain.com/whatever and domain.com/whatever/ from acting like they are the same. Another solution is to use https://github.com/ericf/express-slash, but I don't care to.
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  mongoose.connect('mongodb://localhost/OKStartups')
} else {
	mongoose.connect('mongodb://admin:password@ds037508.mongolab.com:37508/madeinok')
}

// routes
require('./routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
