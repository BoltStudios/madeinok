module.exports = function(app) {
	require('./listing')(app)

	app.get('/', function(req, res) {
		res.render('index', { title: 'Express' })
	})

	/* This route makes AngularJS play nicely with Express.
	   Links will still just appear as .../#/viewname in the browser. */
	app.get('/listings/:viewname', function(req, res) {
		var viewname = req.params.viewname
		res.render('listings/' + viewname)
	})
}