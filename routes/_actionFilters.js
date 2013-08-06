module.exports = {

	/* User needs to be logged in */
	isLoggedIn: function(req, res, next) {
		//if(true)
		//	res.send(401, {error: 'You must be logged in to do that.'})

		if(req.user)
			next()
		else
			res.send(401, {error: 'You must be logged in to do that.'})
	},

	/* User must be an admin */
	isAdmin: function(req, res, next) {
		//if(true)
		//	res.send(401, {error: 'You aren\'t authorized to do that.'})
		next()
	},

	/* User must be connected to the listing */
	isOwnListing: function(req, res, next) {
		next()
	}
}