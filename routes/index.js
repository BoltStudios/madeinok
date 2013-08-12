var User = require('../models/user.js')

module.exports = function(app) {
	require('./listing')(app)
	require('./user')(app)
	require('./account')(app)

	app.get('/', function(req, res) {
		console.log('request user ' + JSON.stringify(req.user))
		res.render('index', { title: 'Express', appName: 'ListApp' })
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


	// ok josh
	// var getUser = function(req, res, next) {
	// 	res.data = {user = 0}
	// }

	// app.get('/something', getUser, function(req, res) {
	// 	res.data.user

	// })
}