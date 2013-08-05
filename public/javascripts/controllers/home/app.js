var controllers = {
	  home: HomeCtrl
  	, about: AboutCtrl
  	, contact: ContactCtrl
}

var views = {
	  home: "/home/index"
	, about: "/home/about"
	, contact: "/home/contact"
}

var app = angular.module('HomeApp', ['ngResource', 'ngCookies', 'authentication-service'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', { controller: HomeCtrl, templateUrl: '/listings/index' })

			// Creation process
			.when('/create', { controller: CreateCtrl, templateUrl: '/listings/editor' })
			.when('/create/:pageNumber', { controller: CreateCtrl, templateUrl: '/listings/editor' })

			// Editing
			.when('/edit/:id', { controller: EditCtrl, templateUrl: '/listings/editor' })
			.when('/edit/:id/:pageNumber', { controller: EditCtrl, templateUrl: '/listings/editor'})

			.when('/view/:id', { controller: ViewCtrl, templateUrl: 'listings/view' })

			.otherwise({ redirectTo: '/' })
			//$locationProvider.html5Mode(true) /* RIP IE9 */
	})