var app = angular.module('EventApp', ['ngResource', 'ngCookies', 'authentication-service'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			//index routes					
			.when('/', { controller: EventIndexCtrl, templateUrl: '/event/index' })
			.when('/index/', { controller: EventIndexCtrl, templateUrl: '/event/index' })
			//create routes
			.when('/create', { controller: EventCreateCtrl, templateUrl: '/event/editor', resolve: SessionMaster.resolve })
			.when('/new', { controller: EventCreateCtrl, templateUrl: '/event/editor', resolve: SessionMaster.resolve })
			//edit routes
			.when('/edit/:id', { controller: EventEditCtrl, templateUrl: '/event/editor', resolve: SessionMaster.resolve })
			//view routes	
			.when('/view/:id', { controller: EventViewCtrl, templateUrl: '/event/view'})
			//Fallback
			.otherwise({ redirectTo: '/' })
			//$locationProvider.html5Mode(true) /* RIP IE9 */
	})

	/* This is a Blog resource. By default, a resource has these methods:
	 * get({id: X}) GET 							-> /api/listings/X
	 * save({}, newInfo) POST 						-> /api/listings/
	 * save({id: X}, newInfo) POST (obj.$save())	-> /api/listings/X
	 * query() get 									-> /api/listings
	 * remove({id: X}) POST 						-> /api/listings/X
	 * delete({id: X}) POST 						-> /api/listings/X
	 * All of this gets based on your base URL, which is supplied to the resource
	 * The example URL is included above
	*/
	.factory('Event', ['$resource', function($resource) {
		return $resource('/api/events/:id', {eventId: '@id'})
	}])
