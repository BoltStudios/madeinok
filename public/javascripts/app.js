angular.module('StartupApp', ['ngResource'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', { controller: ListingCtrl, templateUrl: '/listings/index' })
			.when('/create', { controller: CreateCtrl, templateUrl: '/listings/create' })
			.otherwise({ redirectTo: '/' })
	})