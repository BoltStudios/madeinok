var Listing = require('../models/listing.js')
, Blogs = require('../models/blog.js')
, Events = require('../models/event.js')

module.exports = function(app) {
	app.get('/search', function(req, res) {
		var q = req.query['q']
		var resultr = new Array()
		resultr['listing'] = new Array()
		resultr['events'] = new Array()
		resultr['news'] = new Array()
		
		Listing.find().or([{ 'companyName': { $regex: new RegExp(q, "i") }}, { 'phrase': { $regex: new RegExp(q, "i") }}]).exec(function(err, resu){		

			var j = 0		
			for (var i in resu)
			{
				resultr['listing'][j] = new Array()
				resultr['listing'][j]['id'] = resu[i]['_id']
				resultr['listing'][j]['imageUrl'] = resu[i]['imageUrl']
				j++
			}
			Events.find().or([{ 'title': { $regex: new RegExp(q, "i") }}, { 'description': { $regex: new RegExp(q, "i") }}]).exec(function(err, resu){		
				j = 0
				for (var i in resu)
				{
					if (new Date(resu[i]['date']) > new Date())
					{
						resultr['events'][j] = new Array()
						resultr['events'][j]['id'] = resu[i]['_id']
						resultr['events'][j]['title'] = resu[i]['title']
						resultr['events'][j]['imageUrl'] = (resu[i]['imageUrl']) ? resu[i]['imageUrl'] : '/images/MadeInOK100x100.png'
						j++
					}
				}

				Blogs.find().or([{ 'title': { $regex: new RegExp(q, "i") }}, { 'body': { $regex: new RegExp(q, "i") }}]).exec(function(err, resu){		
					j = 0
					for (var i in resu)
					{
						resultr['news'][j] = new Array()
						resultr['news'][j]['id'] = resu[i]['_id']
						resultr['news'][j]['title'] = resu[i]['title']
						resultr['news'][j]['imageUrl'] = (resu[i]['imageUrl']) ? resu[i]['imageUrl'] : '/images/MadeInOK100x100.png'
						j++
					}
					
					res.render('search', { title: 'Search', appName: 'SearchApp' , res: resultr, query: q})
				})
			})			

		})
	})
}