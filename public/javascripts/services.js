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

/* 
   Authentication service that will be shared across multiple apps. To include it in the app, 
   add 'authentication-service' to the array of requirements for the app.
*/
angular.module('authentication-service', ['flash-service', 'ngCookies'])
	.service('AuthenticationService', ['$http', '$location', '$cookieStore', 'FlashService',
		function($http, $location, $cookieStore, FlashService) {
		return {
			logIn: function(credentials) {
				// send a message to the server. server will set the cookie
				// express and angular don't communicate w/ cookies, so set a 
				// simple cookie here that nobody wants to change.
				$http.post('/login', credentials).success(function(response) {
					FlashService.clear()
					$cookieStore.put('isAuthenticated', true)
					$location.path('/')
				}).error(function(response) {
					FlashService.show(response.error)
				})
			},

			logOut: function() {
				$http.post('/logout').success(function(response) {
					$cookieStore.remove('isAuthenticated')
					$location.path('/login')
				})
			},

			isLoggedIn: function() {
				return $cookieStore.get('isAuthenticated') || false
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

angular.module('blog-service', [])
	.service('BlogService', ['$http', function($http) {
		return {
			create: function(data) {
				return $http.post('/api/blogs/create/', data)
			},
			retrieve: function(id) {
				if(!id)
					return $http.get('/api/blogs')

				return $http.get('/api/blogs/' + id)
			},
			update: function(id, data) {
				return $http.put('/api/blogs/edit/' + id, data)
			},
			destroy: function(id) {
				return $http.post('/api/blogs/delete/' + id)
			}
		}
	}])


//FAILED EXPERIMENT
// angular.module('angular-routes', [])
// 	.service('AngularRoutes', [function() {
// 		return {
// 			controllers: function() {

// 					var controllers = {
// 						accountIndex: AccountIndexCtrl,
// 						accountLogin: AccountSessionCtrl,
// 						accountCreate: AccountCreateCtrl,

// 						blogIndex: BlogIndexCtrl,
// 						blogCreate: BlogCreateCtrl,
// 						blogEdit: BlogEditCtrl,
// 						blogView: BlogViewCtrl,

// 						homeIndex: HomeIndexCtrl,
// 						homeAbout: HomeAboutCtrl,
// 						homeContact: HomeContactCtrl,

// 						listingIndex: ListingIndexCtrl,
// 						listingCreate: ListingCreateCtrl,
// 						listingEdit: ListingEditCtrl,
// 						listingView: ListingViewCtrl,
// 						listingEditor: ListingEditorCtrl,

// 					}
// 				return controllers
// 			},

// 			views: function() {
// 					var views = {
// 						accountIndex: '/account/index',
// 						accountLogin: '/account/login',
// 						accountCreate: '/account/create',

// 						blogIndex: '/blog/index',
// 						blogCreate: '/blog/create',
// 						blogEdit: '/blog/edit',
// 						blogView: '/blog/view',

// 						homeIndex: '/home/index',
// 						homeAbout: '/home/about',
// 						homeContact: '/home/contact',

// 						listingIndex: '/listing/index',
// 						listingEditor: '/listing/editor',
// 						listingView: '/listing/view',
// 					}
// 				return views
// 			}
// 		}
// 	}])
