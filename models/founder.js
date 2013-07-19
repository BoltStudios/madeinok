var mongoose = require('mongoose')

var FounderSchema = new mongoose.Schema({
	name: { type: String, requried: true }
  , title: { type: String, required: false }
  , email: { type: String, required: false, lowercase: true }
  , website: { type: String, required: false, lowercase: true }
})

module.exports = mongoose.model('Founders', FounderSchema)