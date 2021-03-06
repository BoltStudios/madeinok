var Events = require('../models/event.js')
  , _ = require('underscore')
  , filters = require('./_actionFilters.js')
  //required for uploading pictures
  , cloudinary = require('cloudinary')

module.exports = function(app) {

	/* post an image */
	app.post('/api/events/image', filters.isLoggedIn, function(req, res) {
		var image = req.files.uploader
		cloudinary.config(GLOBAL.cloudinaryConfig)

		cloudinary.uploader.upload(req.files.uploader.path, function(result) {
			res.send(200, {image: result.url})
		}, {crop: 'limit', width:100, height:100})
	})

	/* Returns all the listings */
	app.get('/api/events', function(req, res) {
		Events.find(function(err, events) {
			res.send(events)
		})
	})

	/* Return a specific listing */
	app.get('/api/events/:id', function(req, res) {
		var id = req.params.id || 0
		Events.findById(id, function(err, event) {
			res.send(event)
		})
	})

	/* Create a new listing */
	//need to be admin
	app.post('/api/events', filters.isLoggedIn, function(req, res) {
		var newEvent = req.body
		newEvent.creatorId = req.user.guid

		new Events(newEvent).save(function(err, event, count) {
			res.send(event)
		})
	})

	/* Edit a listing */
	//need to be admin
	app.post('/api/events/:id', filters.isLoggedIn, function(req, res) {
		var id = req.params.id || 0
		var structure = req.body
		structure.creator = req.signedCookies.user

		Events.findById(id, function(err, event) {
			_(event).extend(structure)
			console.log(event)

			event.save(function(err) {
				 if(!err)
				 	res.send(event)
				 else
				 	res.send(err)
			})
		})
	})

	/* Delete a listing */
	//need to be admin
	app.delete('/api/events/:id', filters.isLoggedIn, function(req, res) {
		var id = req.params.id || 0
		Events.findByIdAndRemove(id, function(err, listing) {
			if(!err)
				res.send(listing)
			else
				res.send(err)
		})
	})
}