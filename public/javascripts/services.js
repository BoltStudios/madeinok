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