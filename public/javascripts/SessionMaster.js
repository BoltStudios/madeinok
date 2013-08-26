/*
   Add logic for determining the user access level of pages.
   add 'resolve: SessionMaster.resolve' to the route to reach the loggedIn function
*/
var SessionMaster = function() {

}

/* If a page needs a login, include this in the route's resolve */
SessionMaster.resolve = {
	loggedIn: ['$q', '$http', '$location', '$window', 'AuthenticationService', function($q, $http, $location, $window, AuthenticationService) {
		var deferred = $q.defer()
		$http.get('/api/users/current').success(function(response) {
			if(response.guid) {
				AuthenticationService.isLoggedIn(true)
			} else {
				AuthenticationService.isLoggedIn(false)
				var returnUrl = $window.location.toString().split("#")[0]
				var fragment = $window.location.toString().split("#")[1]
				$window.location.href = '/account/#/login/?returnUrl=' + returnUrl + "&fragment=" + fragment
			}
			deferred.resolve(response)
		}).error(function(response) {
			AuthenticationService.isLoggedIn(false)
			var returnUrl = $window.location.toString().split("#")[0]
			var fragment = $window.location.toString().split("#")[1]
			$window.location.href = '/account/#/login/?returnUrl=' + returnUrl + "&fragment=" + fragment
			
			deferred.reject(response)
		})
	}]
}