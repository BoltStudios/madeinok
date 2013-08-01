var User = require('../models/user.js')

module.exports = function(app) {
	require('./listing')(app)
	require('./user')(app)

	app.get('/', function(req, res) {
		res.render('index', { title: 'Express', appName: 'ListApp' })
	})

	app.get('/account', function(req, res) {
		res.render('index', { title: 'Express', appName: 'AccountApp'})
	})

	app.post('/login', function(req, res) {
		// should do validation
		User.findOne({email: req.body.email}, function(err, user) {
			if(!user) {
				res.send(401, {error: 'That email does not exist.'})
			}
			else if(user.isCorrectPassword(req.body.password)) {
				res.cookie('uid', user._id, {signed:true})
				res.send(200)
			} else {
				res.send(401, {error: 'Email/password combination not found.'})
			}
		})

		//res.cookie('name', 'tdogg69', {signed:true})
		// req.signedCookies['name'] to get
		//res.send(200)
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
}