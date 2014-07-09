var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.ObjectId
var Founder = mongoose.Schema.Types.FounderSchema


var ListingSchema = new mongoose.Schema({
	// Non-form information
	creatorId: 			{type: ObjectId},
	contributorIds: 	[ObjectId],
	imageUrl: 			{type: String},
	isPublished: 		{type: Boolean, default: false },

	companyName: 		{type: String, default: 'Unpublished Entry'},
	websiteUrl: 		{type: String},
	phoneNumber: 		{type: String},
	address: 			{line1: {type: String}, line2: {type: String}, city: {type: String}},
	twitterHandle: 		{type: String},
	linkedInUrl: 		{type: String},
	angellistUrl: 		{type: String},

	phrase:   	    	{type:String},

	foundingYear: 		{type: Number},
	companyType: 		{type: String},
	industryFocus: 		{option: {type: String}, description: {type: String}},
	primaryCustomer: 	{type: String},
	fundingRound:  		{type: String},
	totalRaised: 		{type: String},
	annualRevenue:  	{type: String},
	incubatorName:  	{type: String},
	milestone:  		{type: String},
	productTypes: 		[{productType: {type: String}, value: {type: Boolean, default: false}}],
	productTypesOtherDescription: {type:String},

	teamSize:  	        {type: Number},
	developmentOk: 		{type: Number},

	founders: 			[Founder],
	hiringUrl:      	{type: String},
	hiringEmail: 		{type: String, lowercase: true},
	hiringPhone: 		{type: String},
	isHiring: 			{type: Boolean, default: false},
	hasInternships: 	{type: Boolean, default: false}
})

module.exports = mongoose.model('Listings', ListingSchema)

// instead of making types for these, i think we can use the enum attribute on strings
// use match to ensure emails are emails

// to access enum values outside of here:
// var listing = new Listings();
// listing.schema.path('fundingStage').enumValues