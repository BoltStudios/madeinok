/*
   Add logic for determining the user access level of pages.
   add 'resolve: SessionMaster.resolve' to the route to reach the loggedIn function
*/
var SessionMaster = function() {

}

/* If a page needs a login, include this in the route's resolve */
SessionMaster.resolve = {
	loggedIn: ['$q', '$http', '$location', 'AuthenticationService', function($q, $http, $location, AuthenticationService) {
		var deferred = $q.defer()
		$http.get('/api/users/current').success(function(response) {
			if(response.guid) {
				AuthenticationService.isLoggedIn(true)
			} else {
				AuthenticationService.isLoggedIn(false)
				//location.href = '/account/#/login'
				$location.url('/account/#/login')
			}
			deferred.resolve(response)
		}).error(function(response) {
			AuthenticationService.isLoggedIn(false)
			//location.href = '/account/#/login'
			$location.url('/account/#/login')
			deferred.reject(response)
		})
	}]
}