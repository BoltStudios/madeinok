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
			for(var i in events)
			{
				// months
				if (events[i].recurring_period == 1)
				{
					if (monthDiff(events[i].date, new Date()) > 0)
					{
						Events.findById(events[i].id, function(err, event) {
							event.date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay(), events[i].date.getHours(), events[i].date.getMinutes());
							console.log(event.date)
							event.save(function(err) {
								events[i].date = event.date
							})
						})
					}
				}
				else if (events[i].recurring_period == 2) // Weekly
				{
					if (Math.round(Math.abs((events[i].date.getTime() - new Date().getTime())/(24*60*60*1000))) > 6)
					{
						Events.findById(events[i].id, function(err, event) {
							event.date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay(), events[i].date.getHours(), events[i].date.getMinutes());
							console.log(event.date)
							event.save(function(err) {
								events[i].date = event.date
							})
						})
					}
				}
			}
			res.send(events)
		})
	})
	
	function monthDiff(d1, d2) {
		var months;
		months = (d2.getFullYear() - d1.getFullYear()) * 12;
		months -= d1.getMonth() + 1;
		months += d2.getMonth();
		return months <= 0 ? 0 : months;
	}

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