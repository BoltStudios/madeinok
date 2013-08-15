var Listing = require('../models/listing.js')
  , filters = require('./_actionFilters.js')
  , _ = require('underscore')
  , fs = require('fs')

var uploadImage = function(req, res) {
	var image = req.files.imageUrl
	console.log('uploading dat dere image...')
	
	fs.readFile(image.path, function(imageError, data) {
		var date = new Date().getTime()
		var imagePath = __dirname + '/' + date + '/' + image.name
		fs.writeFile(imagePath, data, function(saveError) {
			if(!saveError) {
				console.log('saved image at ' + imagePath)
				return imagePath
			}
		})
	})


	// Listing.findById(listingId, function(error, listing) {
	// 	if(!error && listing) {
	// 		fs.readFile(image.path, function(imageError, data) {
	// 			var imagePath = __dirname + '/' + listingId + '/' + image.name
	// 			fs.writeFile(imagePath, data, function(saveError) {
	// 				if(!saveError)
	// 					return imagePath
	// 			})
	// 		})
	// 	}
	// })
}

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
		var newListing = req.body
		newListing.creatorId = req.user.guid

		console.log('REQ FILES ' + JSON.stringify(req.files))

		new Listing(newListing).save(function(err, listing, count) {
			if(!err && listing && req.files) {
				uploadImage(req, res, listing._id)
			}
			res.send(listing)
		})
	})

	/* Edit a listing */
	app.post('/api/listings/:id', filters.isLoggedIn, function(req, res) {
		var id = req.params.id || 0
		var structure = req.body
		structure.creator = req.signedCookies.user

		console.log('WOAH ' + JSON.stringify(req.files))
		console.log('structure ' + JSON.stringify(structure))

		Listing.findById(id, function(err, listing) {
			if(req.files) {
				console.log('req files ' + req.files)
				uploadImage(req, res, id)
			}
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

	/* Upload an image for a listing */
	app.post('/api/listings/image/:id', filters.isLoggedIn, function(req, res) {
		var id = req.params.id || 0
		  , image = req.files.imageUrl

		console.log('woah woah woah ' + req.files)
		Listing.findById(id, function(error, listing) {
			if(!error && listing) {
				fs.readFile(image.path, function(imageError, data) {
					var imagePath = __dirname + '/' + id + '/' + image.name
					fs.writeFile(imagePath, data, function(saveError) {
						if(!saveError)
							res.send(200, imagePath)
					})
				})
			}
		})

	})

	app.post('/api/listings/image/', filters.isLoggedIn, function(req, res) {
		console.log('here i is ')
		uploadImage(req, res)
	})
}