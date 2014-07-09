var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.ObjectId

var EventSchema = new mongoose.Schema({
	  organization: { type: String }
	, creatorId: 	{ type: ObjectId }
	, title:   		{ type: String }
	, description:  { type: String }
	, imageUrl:		{ type: String }
	, date: 		{ type: Date   }
	, location: 	{ type: String }
	, recurring_period:	{ type: Number, default: 0 }
})

module.exports = mongoose.model('Events', EventSchema)