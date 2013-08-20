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


app.directive('clickHacker', [function() {
	return function(scope, element, attrs) {
		var target = '#' + attrs['target']
		element.bind('click', function() {
			$(target).click()
		})
	}
}])

app.directive('imageUploader', [function() {
	return function(scope, element, attrs) {
		var action = attrs['action']
		  , form = $(element).parents('form')

		element.bind('change', function() {
			form.attr('action', action)
			form.ajaxSubmit({
				type: 'POST',
				uploadProgress: function(event, position, total, percentComplete) { 
					
					scope.$apply(function() {
						// upload the progress bar during the upload
						scope.progress = percentComplete;
					});

				},
				error: function(event, statusText, responseText, form) { 

					// remove the action attribute from the form
					form.removeAttr('action');

					/*
						handle the error ...
					*/

				},
				success: function(responseText, statusText, xhr, form) { 
					filename = responseText.image
					// var ar = $(el).val().split('\\'), 
					// 	filename =  ar[ar.length-1];

					// remove the action attribute from the form
					form.removeAttr('action');

					scope.$apply(function() {
						scope.formData.imageUrl = filename;
						console.log('in directive, ' + scope.formData.imageUrl)
					});

				}
			})
		})
		
	}
}])
