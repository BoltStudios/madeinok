function AccountSessionCtrl($scope, $http, $location, FlashService, AuthenticationService) {

	$scope.credentials = {}

	// if(AuthenticationService.isLoggedIn())
	// 	$location.path('/')

	$scope.login = function() {
		AuthenticationService.logIn($scope.credentials)
	}

	$scope.logout = function() {
		AuthenticationService.logOut()
	}
}