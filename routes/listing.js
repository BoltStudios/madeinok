var Listing = require('../models/listing.js')
  , filters = require('./_actionFilters.js')
  , _ = require('underscore')
  , fs = require('fs')
  , path = require('path')
  , cloudinary = require('cloudinary')
  , keys = require('../keys')

var uploadImage = function(req, res) {
	var image = req.files.uploader	
	cloudinary.config(GLOBAL.cloudinaryConfig)

	cloudinary.uploader.upload(req.files.uploader.path,
  		function(result) { 
  			res.send(200, {image: result.url})
  		})
}

module.exports = function(app) {

	app.post('/api/listings/image', filters.isLoggedIn, function(req, res) {
		console.log('IMAGE UPLOAD..... here i is ')
		uploadImage(req, res)
	})
	
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
		var newListing = req.body
		newListing.creatorId = req.user.guid

		new Listing(newListing).save(function(err, listing, count) {
			res.send(listing)
		})
	})

	/* Edit a listing */
	app.post('/api/listings/:id', filters.isLoggedIn, function(req, res) {
		var id = req.params.id || 0
		var structure = req.body
		structure.creator = req.signedCookies.user

		Listing.findById(id, function(err, listing) {
			_(listing).extend(structure)
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