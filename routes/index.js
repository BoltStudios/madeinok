module.exports = function(app) {
	require('./listing')(app)

	app.get('/', function(req, res) {
		res.render('index', { title: 'Express' })
	})

	app.post('/login', function(req, res) {
		// should do validation
		res.cookie('name', 'tdogg69', {signed:true})
		// req.signedCookies['name'] to get
		res.send(200)
	})

	/* This route makes AngularJS play nicely with Express.
	   Links will still just appear as .../#/viewname in the browser. 
	   Have to create one of these for each directory. */
	app.get('/listings/:viewname', function(req, res) {
		var viewname = req.params.viewname
		res.render('listings/' + viewname)
	})
}