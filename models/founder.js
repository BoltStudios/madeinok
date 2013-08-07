var mongoose = require('mongoose')

var FounderSchema = new mongoose.Schema({
	name: 	{type: String},
  	title: 	{type: String},
  	email: 	{type: String, lowercase: true }
})

module.exports = mongoose.model('Founders', FounderSchema)