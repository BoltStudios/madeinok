function AccountIndexCtrl($scope, $http, $location, User, AuthenticationService, $cookieStore, SessionService) {
	$scope.title = 'Your Account'

	$http.get('/api/users/current').success(function(response) {
		var guid = response ? response.guid : ''
		  , path = '/api/users/'+guid+'/listings/'

		$http.get(path).success(function(response) {
			var listings = response
			$scope.listings = response
			console.log($scope.listings)
		})
	})

	// if not logged in, redirect to login
	// if(!AuthenticationService.isLoggedIn())
	// 	$location.path('/login')

	$scope.logout = function() {
		AuthenticationService.logOut()
	}

	// initialization
	// $http.get('/api/users/current').success(function(response) {
	// 	var uid = response
	// 	$http.get('/api/users/'+uid+'/listings').success(function(response) {
	// 		$scope.listings = response
	// 	})
	// })

	// if logged in, hit the DB and get all the listings by this user

}