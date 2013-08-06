

var app = angular.module('HomeApp', ['ngResource', 'ngCookies'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			//Index routes
			.when('/', 				{ controller: HomeIndexCtrl, 	templateUrl: '/home/index' 		})
			.when('/index', 		{ controller: HomeIndexCtrl, 	templateUrl: '/home/index' 		})
			//About routes
			.when('/about', 		{ controller: HomeAboutCtrl, 	templateUrl: '/home/about' 		})
			.when('/home/about', 	{ controller: HomeAboutCtrl, 	templateUrl: '/home/about' 		})
			//Contact routes
			.when('/contact', 		{ controller: HomeContactCtrl, 	templateUrl: '/home/contact'	})
			.when('/home/contact', 	{ controller: HomeContactCtrl, 	templateUrl: '/home/contact'	})
			//Fallback
			.otherwise({ redirectTo: '/' })
			//$locationProvider.html5Mode(true) /* RIP IE9 */
	})