var Blogs = require('../models/blog.js')
  , _ = require('underscore')
  , filters = require('./_actionFilters.js')

module.exports = function(app) {

	/* Returns all the listings */
	app.get('/api/blogs', function(req, res) {
		Blogs.find(function(err, blogs) {
			res.send(blogs)
		})
	})

	/* Return a specific listing */
	app.get('/api/blogs/:id', function(req, res) {
		var id = req.params.id || 0
		Blogs.findById(id, function(err, blog) {
			res.send(blog)
		})
	})

	/* Create a new listing */
	//need to be admin
	app.post('/api/blogs', filters.isLoggedIn, function(req, res) {
		var newBlog = req.body
		//newBlog.creator = req.signedCookies.user

		new Blogs(newBlog).save(function(err, blog, count) {
			res.send(blog)
		})
	})

	/* Edit a listing */
	//need to be admin
	app.post('/api/blogs/:id', filters.isLoggedIn, function(req, res) {
		var id = req.params.id || 0
		var structure = req.body
		structure.creator = req.signedCookies.user

		Blogs.findById(id, function(err, blog) {
			_(blog).extend(structure)
			console.log(blog)

			blog.save(function(err) {
				 if(!err)
				 	res.send(blog)
				 else
				 	res.send(err)
			})
		})
	})

	/* Delete a listing */
	//need to be admin
	app.delete('/api/blogs/:id', filters.isLoggedIn, function(req, res) {
		var id = req.params.id || 0
		Blogs.findByIdAndRemove(id, function(err, listing) {
			if(!err)
				res.send(listing)
			else
				res.send(err)
		})
	})
}