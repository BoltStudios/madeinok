var User = require('../models/user')
  , _ = require('lodash')
  , filters = require('./_actionFilters.js')

module.exports = function(app) {

	/* Returns all the users */
	app.get('/api/users', function(req, res) {
		User.find(function(err, users) {
			res.send(users)
		})
	})

	/* Return a specific user */
	app.get('/api/users/:id', function(req, res) {
		var id = req.params.id || 0
		User.findById(id, function(err, user) {
			res.send(user)
		})
	})

	/* Create a new user */
	app.post('/api/users', function(req, res) {
		var newUser = {}
		newUser = req.body

		var userObj = new User(newUser)
		userObj.setPassword(newUser.password)

		userObj.save(function(err, user, count) {
			res.send(user)
		})

		// new User(newUser).save(function(err, user, count) {
		// 	res.send(user)
		// })
	})

	/* Edit a user */
	app.post('/api/users/:id', filters.isLoggedIn, function(req, res) {
		var id = req.params.id || 0
		var structure = req.body
		User.findById(id, function(err, user) {
			_(user).extend(structure)
			console.log(user)

			user.save(function(err) {
				 if(!err)
				 	res.send(user)
				 else
				 	res.send(err)
			})
		})
	})

	/* Delete a user */
	app.delete('/api/users/:id', filters.isAdmin, function(req, res) {
		var id = req.params.id || 0
		User.findByIdAndRemove(id, function(err, user) {
			if(!err)
				res.send(user)
			else
				res.send(err)
		})
	})
}