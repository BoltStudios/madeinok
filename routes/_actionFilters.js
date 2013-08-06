module.exports = {

	/* User needs to be logged in */
	isLoggedIn: function(req, res, next) {
		if(req.user)
			next()
		else
			res.send(401, {error: 'You must be logged in to do that.'})
	},

	/* User must be an admin */
	isAdmin: function(req, res, next) {
		if(req.user.role == 'admin')
			next()
		else
			res.send(401, {error: 'You must be an admin to do that.'})
	},

	/* User must be connected to the listing */
	isOwnListing: function(req, res, next) {
		next()
	}
}