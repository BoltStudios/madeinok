var mongoose = require('mongoose')
  , bcrypt = require('bcrypt')
  , ObjectId = mongoose.Schema.ObjectId

var UserSchema = new mongoose.Schema({
	username: {type: String, required: false}
  , email: {type: String, required: true, lowercase: true}
  , password: {type: String, required: true}
})

UserSchema.methods.setPassword = function(passwordString) {
	this.password = bcrypt.hashSync(passwordString, 10)
}

UserSchema.methods.isCorrectPassword = function(passwordString) {
	return bcrypt.compareSync(passwordString, this.password)
}

module.exports = mongoose.model('Users', UserSchema)