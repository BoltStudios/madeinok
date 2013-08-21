/*
	Log in, log out.
*/

var passport = require('passport')
  , twitter = require('passport-twitter').Strategy
  , facebook = require('passport-facebook').Strategy
  , User = require('../models/user')

module.exports = function(app) {

	// access user through req.user
	passport.serializeUser(function(user, done) {		
		done(null, {
		 	id: user['id'],
		 	provider: user['provider'],
		 	guid: user['_id']
		});
	});

	passport.deserializeUser(function(user, done) {
		done(null, user)
	})

	// Twitter -  just sending provider and id for now
	passport.use(new twitter({
		consumerKey: 'rcFo0Fee6JiukSK3vfGZlA',
		consumerSecret: 'AK3RBfUzKizK7bZDyJ1u6PsKvKXUL0bNjvE0pKlfis',
		callbackURL: '/auth/twitter/callback',
	}, function(token, tokenSecret, profile, done) {
		var object = {provider: profile.provider, id: profile.id}
		var profileObject = {provider: profile.provider, id: profile.id, name: profile.displayName}

		// Find or create a user!
		User.findOne(object, function(error, user) {
			if(error) {
				return done(error)
			} else if(!user) {
				new User(profileObject).save(function(error, newUser) {
					return done(null, newUser)
				})
			} else {
				return done(null, user)
			}
		})
	}))

	// Facebook
	passport.use(new facebook({
		clientID: '411315155655493',
		clientSecret: '8f0fc227c392111c81da2eb68f5a9f8e',
		callbackURL: '/auth/facebook/callback'
	}, function(accessToken, refreshToken, profile, done) {
		console.log(profile)
		var object = {provider: profile.provider, id: profile.id }
		var profileObject = {provider: profile.provider, id: profile.id, name: profile.displayName}

		// Find or create a user!
		User.findOne(object, function(error, user) {
			if(error) {
				return done(error)
			} else if(!user) {
				new User(profileObject).save(function(error, newUser) {
					return done(null, newUser)
				})
			} else {
				return done(null, user)
			}
		})
		
	}))

	app.get('/auth/twitter', passport.authenticate('twitter', {session:true}))

	// app.get('/auth/twitter/callback', passport.authenticate('twitter',
	// 	{successRedirect: '#/?auth=true', failureRedirect: '/account'}))

	app.get('/auth/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/account'}),
		function(req, res) {
			console.log('set a cookie')
			res.redirect('/')
		})


	app.get('/auth/facebook', passport.authenticate('facebook'))
	app.get('/auth/facebook/callback', passport.authenticate('facebook', 
		{successRedirect: '/', failureRedirect: '/account' }))


	app.get('/account', function(req, res) {
		console.log('req.user is ' + JSON.stringify(req.user))
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

	app.get('/logout', function(req, res) {
		// req.logOut()
		//res.clearCookie('user')
		req.logout()
		res.send(200)
	})
}