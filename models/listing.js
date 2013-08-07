var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.ObjectId
var Founder = mongoose.Schema.Types.FounderSchema

var fundingStages = 'Bootstrapped|Seed|Series A|Series B|Series C|Series D+'.split('|')
var totalFundings = '<$100k|$100 - 500k|$500k - 1M|$1M - 5M|$5M - 10M|$10M+'.split('|')
var annualRevenueTypes = '<$100k|$100 - 500k|$500k - 1M|$1M - 5M|$5M - 10M|$10M - 50M|$50M+'.split('|')
var companyTypes = 'Technology Company|Agency|Dev Shop|Service Firm|Incubator/Accelerator|VC/Angel Fund|Other'.split('|')
var productTypes = 'Website|Mobile App|SaaS|PaaS|IaaS|Games'.split('|')
var primaryCustomerTypes = 'Consumer|Business|Non-Profit|Public Sector|Other'.split('|')
var industryTypes = 'Media|Retail|E-Commerce|Energy|Healthcare|Games|Consumer|IT|Advertising/Marketing|Finance|Education|Sports|Travel|Business Services|Food|Other'.split('|')

// This will be uncommented once I finalize the form.
// var ListingSchema = new mongoose.Schema({
// 	creator: { type: ObjectId, required: true }			// links to a user acct
//   , companyName: { type: String, required: true }
//   , address: { type: String, required: true }
//   , phone: { type: String, required: true }
  
//   , website: { type: String, required: true, lowercase: true }
//   , twitterProfile: { type: String, required: false, lowercase: true }
//   , linkedInProfile: { type: String, required: false, lowercase: true }
//   , angellistProfile: { type: String, required: false, lowercase: true }

//   , isHiringInOk: { type: Boolean, required: true }
//   , hiringUrl: {type: String, required: true, lowercase: true }
//   , isInternshipAvailable: { type: Boolean, required: true }
//   , hiringEmail: { type: String, required: true, lowercase: true }

//   , yearFounded: { type: String, required: false }
//   , teamSize: { type: Number, required: false }
//   , teamInOkSize: { type: Number, required: false }
//   , incubator: { type: Boolean, required: false }		// ?
//   , accelerator: { type: Boolean, required: false }		// ?
//   , fundingStage: { type: String, required: true, enum: fundingStages }
//   , totalFunding: { type: String, required: true, enum: totalFundings }
//   , annualRevenue: { type: String, required: true, enum: annualRevenueTypes }
//   , tractionMilestone: { type: Number, required: false }

//   , companyType: { type: String, required: false, enum: companyTypes }
//   , productType: { type: String, required: false, enum: productTypes }
//   , primaryCustomer: { type: String, required: true, enum: primaryCustomerTypes }
//   , industry: { type: String, required: true, enum: industryTypes }

//   , founders: [Founder]
// })

var ListingSchema = new mongoose.Schema({
	creatorId: 		{type: ObjectId},
	contributorIds: [ObjectId],
	isPublished: 	{type: Boolean, default: false },
	companyName: 	{type: String},
	phoneNumber: 	{type: String},
	address: 		{line1: {type: String}, line2: {type: String}, city: {type: String}},
	websiteUrl: 	{type: String},
	twitterHandle: 	{type: String},
	linkedInUrl: 	{type: String},
	angellistUrl: 	{type: String} 
})

module.exports = mongoose.model('Listings', ListingSchema)

// instead of making types for these, i think we can use the enum attribute on strings
// use match to ensure emails are emails

// to access enum values outside of here:
// var listing = new Listings();
// listing.schema.path('fundingStage').enumValues