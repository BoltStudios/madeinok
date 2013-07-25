//********************************************************************************
// begin shared services
//********************************************************************************

/* Authentication service that will be shared across multiple apps. To include it in the app, 
   add 'authentication-service' to the array of requirements for the app.
*/
angular.module('authentication-service', [])
	.service('AuthenticationService', ['$http', '$location', '$cookies', '$cookieStore', 
		function($http, $location, $cookies, $cookieStore) {
		return {
			logIn: function(credentials) {
				// send a message to the server. server will set a value for the name
				$http.post('/login', credentials).success(function(response) {

				}).error(function(response) {

				})
			},

			logOut: function() {
				$cookieStore.remove('name')
				$location.path('/')
			},

			isLoggedIn: function() {
				// server sets the name value on the cookie, so see if that's there.
				// still checking stuff on the server side, so even if someone sees this source, they'll
				// have to get around that, too.
				return $cookies.name ? true : false
			}
		}
	}])
//********************************************************************************
// end shared services
//********************************************************************************



var app = angular.module('StartupApp', ['ui.bootstrap', 'ngResource', 'ngCookies', 'authentication-service'])

	// Configure routes
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', { controller: ListingCtrl, templateUrl: '/listings/index' })

			.when('/create', { controller: CreateCtrl, templateUrl: '/listings/create' })	// Regular ol' get
			.when('/create/:pageNumber', { controller: CreateCtrl, templateUrl: '/listings/create' })	// Navigating pages
			.when('/create/:pageNumber/:id', { controller: CreateCtrl, templateUrl: '/listings/create' }) // Editing an unpublished listing
			.otherwise({ redirectTo: '/' })
			//$locationProvider.html5Mode(true) /* RIP IE9 */
	})

	// Interceptor for stuff
	//https://www.youtube.com/watch?v=hqAyiqUs93c?t=43m50s
	.config(function($httpProvider) {

	})


	// .factory('AuthenticationService', function($http, $location, $cookies, $cookieStore) {
	// 	return {
	// 		logIn: function(credentials) {
	// 			// send a message to the server. server will set a value for the name
	// 			$http.post('/login', credentials).success(function(response) {

	// 			}).error(function(response) {

	// 			})
	// 		},

	// 		logOut: function() {
	// 			$cookieStore.remove('name')
	// 			$location.path('/')
	// 		},

	// 		isLoggedIn: function() {
	// 			// server sets the name value on the cookie, so see if that's there.
	// 			// still checking stuff on the server side, so even if someone sees this source, they'll
	// 			// have to get around that, too.
	// 			return $cookies.name ? true : false
	// 		}
	// 	}
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
			// Don't allow create or any create/whatever pages to be accessed without login
			//requireLogin(/\bcreate/)
		})
	})

	// Easy way to hook up client/server calls
	// Going to replace this with a resource once I figure that out
	// Not sure this is the right syntax (it is def. wrong)
	// the array of stuff prevents minifying screwing everything up
	// .factory('ListingService', ['$http', function($http) {

	// 	return {
	// 		var Listing = function(data) {
	// 			angular.extend(this, data)
	// 		}

	// 		// Usage: Listing.get()
	// 		Listing.get = function(id) {
	// 			$http.get('/api/listings/' + id).success(function(response) {

	// 			}).error(function(response) {

	// 			})
	// 		}

	// 		// Usage: x = new Listing() ... x.create()
	// 		Listing.prototype.create = function() {
	// 			var listing = this
	// 			$http.post('/api/listings/create', listing).success(function(response) {

	// 			}).error(function(response) {

	// 			})
	// 		}
	// 	}
	// }])


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