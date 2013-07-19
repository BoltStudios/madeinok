var Listing = require('../models/listing.js')


exports.list = function(req, res) {
	Listing.find(function(err, listings) {
		res.send(listings)
	})
}

exports.create = function(req, res) {
	var newListing = Object.create(req.body)
	new Listing(newListing).save(function(err, listing, count) {
		res.redirect('/')
	})
}