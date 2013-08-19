var app = angular.module('EventApp', ['ngResource', 'ngCookies', 'authentication-service', 'event-factory'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
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
	}])
