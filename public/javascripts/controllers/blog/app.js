var controllers = {
	  index: BlogsCtrl
  	, create: CreateCtrl
  	, edit: EditCtrl
  	, view: ViewCtrl
}

var views = {
	  index: "/blog/index"
	, create: "/blog/create"
	, edit: "/blog/editor"
	, view: "/blog/view/"
}

var app = angular.module('BlogApp', ['ngResource', 'ngCookies', 'authentication-service'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			//index routes
			.when('/blog', 			{ controller: controllers.index, 	templateUrl: views.index })
			.when('/blog/index',    { controller: controllers.index, 	templateUrl: views.index })
			//create routes
			.when('/blog/create', 	{ controller: controllers.create, 	templateUrl: views.create })
			.when('/blog/new', 		{ controller: controllers.create, 	templateUrl: views.create })
			//edit routes
			.when('/blog/edit/:id', { controller: controllers.edit, templateUrl: views.edit })
			//view routes
			.when('/blog/view/:id', { controller: controllers.view, templateUrl: views.view })
			//Fallback
			.otherwise({ redirectTo: '/' })
			//$locationProvider.html5Mode(true) /* RIP IE9 */
	})