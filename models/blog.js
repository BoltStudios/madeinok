var mongoose = require('mongoose')

var BlogSchema = new mongoose.Schema({
	  name: 	{ type: String }
	, title:   	{ type: String }
	, body:  	{ type: String }
	, date: 	{ type: Date   }
})

module.exports = mongoose.model('Blogs', BlogSchema)