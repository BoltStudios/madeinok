var User = require('../models/user.js')

module.exports = function(app) {
	require('./listing')(app)
	require('./user')(app)
	require('./home')(app)
	require('./blog')(app)

	app.get('/', function(req, res) {
		res.render('index', { title: 'Express', appName: 'HomeApp' })
	})

	//these have to be in app.get('/whatever/',...) format with the slash before and after the route,
	//otherwise, the angular routes break when using multiple apps.
	app.get('/listing', function(req, res) { res.redirect('/listing/')})
	app.get('/listing/', function(req, res) {
		res.render('index', { title: 'Express', appName: 'ListApp' })
	})

	app.get('/account', function(req, res) { res.redirect('/account/')})
	app.get('/account/', function(req, res) {
		res.render('index', { title: 'Express', appName: 'AccountApp'})
	})

	app.get('/home', function(req, res) { res.redirect('/home/')})
	app.get('/home/', function(req, res) {
		res.render('index', {title: 'Express', appName: 'HomeApp'})
		// var viewname = req.params.viewname
		// console.log(req.params.viewname);
		// res.render('home/' + viewname)
	})

	app.get('/blog', function(req, res) { res.redirect('/blog/')})
	app.get('/blog/', function(req, res) {		
		res.render('index', {title: 'Express', appName: 'BlogApp'})
		// var viewname = req.params.viewname
		// console.log(req.params.viewname);
		// res.render('blog/' + viewname)
	})

	app.post('/login', function(req, res) {
		// should do validation
		User.findOne({email: req.body.email}, function(err, user) {
			if(!user) {
				res.send(401, {error: 'That email does not exist.'})
			}
			else if(user.isCorrectPassword(req.body.password)) {
				res.cookie('user', user._id, {signed:true})
				res.send(200)
			} else {
				res.send(401, {error: 'Email/password combination not found.'})
			}
		})
	})

	app.post('/logout', function(req, res) {
		res.clearCookie('user')
		res.send(200)
	})

	/* This route makes AngularJS play nicely with Express.
	   Links will still just appear as .../#/viewname in the browser. 
	   Have to create one of these for each directory. 
	*/
	app.get('/listings/:viewname', function(req, res) {
		var viewname = req.params.viewname
		res.render('listings/' + viewname)
	})

	app.get('/account/:viewname', function(req, res) {
		var viewname = req.params.viewname
		res.render('account/' + viewname)
	})

	app.get('/home/:viewname', function(req, res) {
		var viewname = req.params.viewname
		res.render('home/' + viewname)
	})

	app.get('/blog/:viewname', function(req, res) {
		var viewname = req.params.viewname
		res.render('blog/' + viewname)
	})
}