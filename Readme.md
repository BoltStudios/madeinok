Put this in keys.js (in the same folder as app.js)

GLOBAL.cloudinaryConfig = {
	cloud_name: '',
	api_key: '', 
  	api_secret: ''
}

GLOBAL.twitter = {
	consumerKey: '',
	consumerSecret: '',
	callbackURL: '/auth/twitter/callback'
}

GLOBAL.facebook = {
	clientID: '',
	clientSecret: '',
	callbackURL: '/auth/facebook/callback'
}

GLOBAL.mongolab = {
	URI: ''
}