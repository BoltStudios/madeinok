/* 
	There is a goddamned error when posting to this from angular...

	{"error":
		{
			"message":"Blogisnotdefined",
			"stack":"ReferenceError:
------->		Blogisnotdefined\n          <-------- (I think this is the problem, and I think it lives at .../okstartups/routes/blog.js:49)
				at/Users/calekennedy/Projects/okstartups/routes/blog.js:49:7\n
				atcallbacks(/Users/calekennedy/Projects/okstartups/node_modules/express/lib/router/index.js:161:37)\n
				atmodule.exports.isLoggedIn(/Users/calekennedy/Projects/okstartups/routes/_actionFilters.js:7:3)\n
				atcallbacks(/Users/calekennedy/Projects/okstartups/node_modules/express/lib/router/index.js:161:37)\n
				atparam(/Users/calekennedy/Projects/okstartups/node_modules/express/lib/router/index.js:135:11)\n
				atpass(/Users/calekennedy/Projects/okstartups/node_modules/express/lib/router/index.js:142:5)\n
				atRouter._dispatch(/Users/calekennedy/Projects/okstartups/node_modules/express/lib/router/index.js:170:5)\n
				atObject.router(/Users/calekennedy/Projects/okstartups/node_modules/express/lib/router/index.js:33:10)\n
				atnext(/Users/calekennedy/Projects/okstartups/node_modules/express/node_modules/connect/lib/proto.js:190:15)\n
				atnext(/Users/calekennedy/Projects/okstartups/node_modules/express/node_modules/connect/lib/middleware/session.js:312:9)"
		}
	}
*/

var Blogs = require('../models/blog.js')
  , _ = require('lodash')
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
	app.post('/api/blogs', filters.isLoggedIn, function(req, res) {
		var newBlog = req.body
		//newBlog.creator = req.signedCookies.user

		new Blogs(newBlog).save(function(err, blog, count) {
			res.send(blog)
		})
	})

	/* Edit a listing */
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
	app.delete('/api/blogs/:id', filters.isAdmin, function(req, res) {
		var id = req.params.id || 0
		Blogs.findByIdAndRemove(id, function(err, listing) {
			if(!err)
				res.send(listing)
			else
				res.send(err)
		})
	})
}