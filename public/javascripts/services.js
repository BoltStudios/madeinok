/*
	Shows a flash message.
*/
angular.module('flash-service', [])
	.service('FlashService', ['$rootScope', function($rootScope) {
		return {
			show: function(message) {
				$rootScope.flash = message
			},

			clear: function() {
				$rootScope.flash = ''
			}
		}
	}])

/* Authentication service that will be shared across multiple apps. To include it in the app, 
   add 'authentication-service' to the array of requirements for the app.
*/
angular.module('authentication-service', ['flash-service'])
	.service('AuthenticationService', ['$http', '$location', '$cookies', '$cookieStore', 'FlashService',
		function($http, $location, $cookies, $cookieStore, FlashService) {
		return {
			logIn: function(credentials) {
				// send a message to the server. server will set a value for the name
				// TODO: check that the password was ok
				$http.post('/login', credentials).success(function(response) {
					FlashService.clear()
					$location.path('/')
				}).error(function(response) {
					FlashService.show(response.error)
					console.log('error ' + JSON.stringify(response))
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


angular.module('status401-service', [])
	.service('Status401Service', ['$httpProvider', function($httpProvider) {

		return {
			handle: $httpProvider.responseInterceptors.push(function($q, $location) {
				var success = function(response) {
					return response
				}

				var error = function(response) {
					if(response.status == 401) {
						console.log('401 ' + response)
						return response.data.error
					}

					return $q.reject(response)
				}

				return function(promise) {
					return promise.then(success, error)
				}
			})
		}
	}])


/* NOT USED BUT PRESERVED FOR AN EXAMPLE */
/* Service to have quick access to the Listings API 
 * Each function returned from this service only returns a promise.
 * It is up to the user to handle the success() and error() calllbacks.
*/
// angular.module('listing-service', [])
// 	.service('ListingService', ['$http', function($http) {
// 		return {
// 			create: function(data) {
// 				return $http.post('/api/listings/create/', data)
// 			},
// 			retrieve: function(id) {
// 				if(!id)
// 					return $http.get('/api/listings')

// 				return $http.get('/api/listings/' + id)
// 			},
// 			update: function(id, data) {
// 				return $http.put('/api/listings/edit/' + id, data)
// 			},
// 			destroy: function(id) {
// 				return $http.post('/api/listings/delete/' + id)
// 			}
// 		}
// 	}])