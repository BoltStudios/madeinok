var mongoose = require('mongoose')

var EventSchema = new mongoose.Schema({
	  organization: { type: String }
	, title:   		{ type: String }
	, description:  { type: String }
	, imageUrl:		{ type: String }
	, date: 		{ type: Date   }
})

module.exports = mongoose.model('Events', EventSchema)