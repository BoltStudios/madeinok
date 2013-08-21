/* Register the companies globally */
/* This is a Listing resource. By default, a resource has these methods:
 * get({id: X}) GET 							-> /api/listings/X
 * save({}, newInfo) POST 						-> /api/listings/
 * save({id: X}, newInfo) POST (obj.$save())	-> /api/listings/X
 * query() get 									-> /api/listings
 * remove({id: X}) POST 						-> /api/listings/X
 * delete({id: X}) POST 						-> /api/listings/X
 * All of this gets based on your base URL, which is supplied to the resource
 * The example URL is included above
*/
angular.module('listing-factory', ['ngResource'])
	.factory('Listing', ['$resource', function($resource) {
		return $resource('/api/listings/:id', {listingId: '@id'})
	}])


angular.module('user-factory', ['ngResource'])
	.factory('User', ['$resource', function($resource) {
		return $resource('/api/users/:id', {userId: '@id'})
	}])

angular.module('blog-factory', [])
	.factory('Blog', ['$resource', function($resource) {
		return $resource('/api/blogs/:id', {blogId: '@id'})
	}])

angular.module('event-factory', [])
	.factory('Event', ['$resource', function($resource) {
		return $resource('/api/events/:id', {eventId: '@id'})
	}])

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

   TODO: store current user in an object so we don't hit the DB every time
   This can let us do roles, etc.
*/
angular.module('authentication-service', ['flash-service', 'session-service', 'ngCookies'])
	.service('AuthenticationService', ['$q', '$http', '$location', '$cookieStore', 'FlashService',
		function($q, $http, $location, $cookieStore, FlashService) {
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
				var deferred = $q.defer()
				$http.post('/logout').success(function(response) {
					$cookieStore.put('isAuthenticated', false)
					$cookieStore.remove('isAuthenticated')
					$location.path('/login')
					deferred.resolve(response)
				})
			},

			isLoggedIn: function(value) {
				if(value == true) {
					$cookieStore.put('isAuthenticated', value)
					return value
				} else if(value == false) {
					$cookieStore.remove('isAuthenticated')
				}

				else {
					var deferred = $q.defer()
					$http.get('/api/users/current').success(function(response) {
						if(response.guid) {
							return true
						} else {
							return false
						}
						deferred.resolve(response)
					}).error(function(response) {
						return false
						deferred.reject(response)
					})
				}

				//return $cookieStore.get('isAuthenticated') || false
			}		}
	}])


/* Calls AuthenticationService to initially set if a user is logged in. This is unfortunately tightly coupled 
   with the authentication on the server side (?auth=true)
*/
angular.module('session-service', ['authentication-service'])
	.service('SessionService', ['AuthenticationService', '$routeParams', '$http', function(AuthenticationService, $routeParams, $http) {
		if($routeParams.auth) {
			AuthenticationService.isLoggedIn(true)
		}
	}])


angular.module('status401-service', [])
	.service('Status401Service', ['$httpProvider', function($httpProvider) {

		return {
			handle: $httpProvider.responseInterceptors.push(['$q', '$location', function($q, $location) {
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
			}])
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
