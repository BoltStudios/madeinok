var Listing = require('../models/listing.js')
  , _ = require('lodash')
  , filters = require('./_actionFilters.js')

module.exports = function(app) {
	
	/* Returns all the listings */
	app.get('/api/listings', function(req, res) {
		Listing.find(function(err, listings) {
			res.send(listings)
		})
	})

	/* Return a specific listing */
	app.get('/api/listings/:id', function(req, res) {
		var id = req.params.id || 0
		Listing.findById(id, function(err, listing) {
			res.send(listing)
		})
	})

	/* Create a new listing */
	app.post('/api/listings', filters.isLoggedIn, function(req, res) {
		var newListing = {}
		newListing = req.body
		new Listing(newListing).save(function(err, listing, count) {
			res.send(listing)
		})
	})

	/* Edit a listing */
	app.post('/api/listings/:id', filters.isLoggedIn, function(req, res) {
		var id = req.params.id || 0
		var structure = req.body
		Listing.findById(id, function(err, listing) {
			_(listing).extend(structure)
			console.log(listing)

			listing.save(function(err) {
				 if(!err)
				 	res.send(listing)
				 else
				 	res.send(err)
			})
		})
	})

	/* Delete a listing */
	app.delete('/api/listings/:id', filters.isAdmin, function(req, res) {
		var id = req.params.id || 0
		Listing.findByIdAndRemove(id, function(err, listing) {
			if(!err)
				res.send(listing)
			else
				res.send(err)
		})
	})
}