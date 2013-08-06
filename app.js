var mongoose = require('mongoose')
  , express = require('express')
  , http = require('http')
  , path = require('path')
  , app = express()
;


// all environments
//I added the wrapper because I think it makes it looks cleaner.
app.configure(function () {  

	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views'); //had to add this line because it was missing/commented.
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('yolo'));
	app.use(express.session());
	app.enable('strict routing'); //has to go above app.use(app.router); this will prevent domain.com/whatever and domain.com/whatever/ from acting like they are the same. Another solution is to use https://github.com/ericf/express-slash, but I don't care to.
	app.use(app.router);

	app.use(require('less-middleware')({ src: __dirname + '/public' }));
	app.use(express.static(path.join(__dirname, 'public')));

	mongoose.connect('mongodb://localhost/OKStartups');
});
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// routes
require('./routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
