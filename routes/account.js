/*
	Log in, log out.
*/

var passport = require('passport')
  , twitter = require('passport-twitter').Strategy
  , facebook = require('passport-facebook').Strategy

module.exports = function(app) {

	// Twitter
	passport.use(new twitter({
		consumerKey: 'rcFo0Fee6JiukSK3vfGZlA',
		consumerSecret: 'AK3RBfUzKizK7bZDyJ1u6PsKvKXUL0bNjvE0pKlfis',
		callbackURL: '/auth/twitter/callback',
	}, function(token, tokenSecret, profile, done) {
		console.log(profile)
	}))

	// Facebook
	passport.use(new facebook({
		clientID: '411315155655493',
		clientSecret: '8f0fc227c392111c81da2eb68f5a9f8e',
		callbackURL: '/auth/facebook/callback'
	}, function(accessToken, refreshToken, profile, done) {
		console.log(profile)
	}))

	app.get('/auth/twitter', passport.authenticate('twitter'))

	app.get('/auth/twitter/callback', passport.authenticate('twitter',
		{successRedirect: '/', failureRedirect: '/account'}))

	app.get('/auth/facebook', passport.authenticate('facebook'))
	app.get('/auth/facebook/callback', passport.authenticate('facebook', 
		{successRedirect: '/', failureRedirect: '/account' }))


	app.get('/account', function(req, res) {
		res.render('index', { title: 'Express', appName: 'AccountApp'})
	})

	app.post('/login', function(req, res) {
		// should do validation
		User.findOne({email: req.body.email}, function(err, user) {
			if(!user) {
				res.send(401, {error: 'That email does not exist.'})
			}
			else if(user.isCorrectPassword(req.body.password)) {
				res.cookie('user', user._id, {signed:true})
				res.send(200)
			} else {
				res.send(401, {error: 'Email/password combination not found.'})
			}
		})
	})

	app.post('/logout', function(req, res) {
		res.clearCookie('user')
		res.send(200)
	})
}