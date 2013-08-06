var app = angular.module('ListApp', ['ngResource', 'ngCookies', 'authentication-service', 'session-service', 'listing-factory'])

	// Configure routes
	// Check the controllers for paths if you change these.
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', { controller: ListingIndexCtrl, templateUrl: '/listings/index' })

			// Creation process
			.when('/create', { controller: ListingCreateCtrl, templateUrl: '/listings/editor', resolve: SessionMaster.resolve })
			.when('/create/:pageNumber', { controller: ListingCreateCtrl, templateUrl: '/listings/editor', resolve: SessionMaster.resolve })

			// Editing
			.when('/edit/:id', { controller: ListingEditCtrl, templateUrl: '/listings/editor', resolve: SessionMaster.resolve })
			.when('/edit/:id/:pageNumber', { controller: ListingEditCtrl, templateUrl: '/listings/editor', resolve: SessionMaster.resolve })

			.when('/view/:id', { controller: ListingViewCtrl, templateUrl: 'listings/view' })

			.otherwise({ redirectTo: '/' })
			//$locationProvider.html5Mode(true) /* RIP IE9 */
	})

	// Interceptor for stuff
	//https://www.youtube.com/watch?v=hqAyiqUs93c?t=43m50s
	// .config(function($httpProvider) {

	// 	//If the status code is 401, I still want to see the error message.
	// 	$httpProvider.responseInterceptors.push(function($q, $location) {
	// 		var success = function(response) {
	// 			return response
	// 		}
	// 		var error = function(response) {
	// 			// If 41 error occurs, the user is not authorized to perform an action.
	// 			if(response.status == 401) {
	// 				console.log(response)
	// 				return response.data.error
	// 			}
	// 			return $q.reject(response)
	// 		}

	// 		return function(promise) {
	// 			return promise.then(success, error)
	// 		}

	// 	})
	// })


	// .config(function ($httpProvider) {

 //  		var logsOutUserOn401 = ['$q', '$location', function ($q, $location) {
 //    		var success = function (response) {
 //      			return response;
 //    		}

	//     	var error = function (response) {
	//       		if (response.status === 401) {
	//         		//redirect them back to login page
	//         		$location.path('/')

	//         		return $q.reject(response)
	//       		} 
	//       		else {
	//         		return $q.reject(response)
	//       		}
	//     	}

	//     	return function (promise) {
	//       		return promise.then(success, error)
	//     	}
 //  		}]

 //  		$httpProvider.responseInterceptors.push(logsOutUserOn401);
	// })


	.run(function($rootScope, $location, AuthenticationService) {

		var redirect = '/'
		var isLoggedIn = AuthenticationService.isLoggedIn()
		console.log('logged in? ' + isLoggedIn)

		// Need to be logged in to access pages matching a regex
		var requireLogin = function(regexp) {
			if($location.path().match(regexp) != null && !isLoggedIn)
				$location.path(redirect)
		}

		$rootScope.$on('$routeChangeStart', function(event, next, current) {
			// TODO: put all pages requiring login here
			// Don't allow create or any create/whatever pages to be accessed without login
			//requireLogin(/\bcreate/)
		})
	})


/* Does not allow users to input any more characters than the 
   limit defined by the attribute maxlengthlimit
   EXAMPLE: <input type='text' maxlengthlimit='some value' />
*/
app.directive('maxlengthlimit', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, ngModelCtrl) {
			var maxLength = Number(attrs.maxlengthlimit)
			function fromUser(text) {
				if(text.length > maxLength) {
					var transformedInput = text.substring(0, maxLength)
					ngModelCtrl.$setViewValue(transformedInput);
            		ngModelCtrl.$render();
            		return transformedInput;
				}
				return text
			}
			ngModelCtrl.$parsers.push(fromUser)
		}
	}
})