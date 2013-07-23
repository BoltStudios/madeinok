var Listing = require('../models/listing.js')

module.exports = function(app) {
	
	/* Returns all the listings */
	app.get('/api/listings/all', function(req, res) {
		Listing.find(function(err, listings) {
			res.send(listings)
		})
	})

	app.post('/api/listings/create', function(req, res) {
		console.log('>>>>>>>> ' + req.body)
		console.log('>>>>>>>> ' + JSON.stringify(req.body))
		// var newListing = {}
		// newListing = req.body
		// new Listing(newListing).save(function(err, listing, count) {
		// 	res.redirect('/')
		// })
	})

	app.get('/api/listings/create', function(req, res) {
		res.redirect('/')
	})
}