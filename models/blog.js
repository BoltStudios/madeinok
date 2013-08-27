var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.ObjectId

var BlogSchema = new mongoose.Schema({
	  name: 		{ type: String }
    , creatorId: 	{ type: ObjectId }
	, title:   		{ type: String }
	, shortTitle:   { type: String }
	, body:  		{ type: String }
	, imageUrl: 	{ type: String }
	, date: 		{ type: Date   }
})

module.exports = mongoose.model('Blogs', BlogSchema)