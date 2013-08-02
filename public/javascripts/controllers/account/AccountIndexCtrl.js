function AccountIndexCtrl($scope, $http, $location, User, AuthenticationService) {
	$scope.title = 'Your Account'

	// if not logged in, redirect to login
	if(!AuthenticationService.isLoggedIn())
		$location.path('/login')

	$scope.logout = function() {
		AuthenticationService.logOut()
	}

	// if logged in, hit the DB and get all the listings by this user

}