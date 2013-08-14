var AccountSessionCtrl = ['$scope', 'FlashService', 'AuthenticationService', function($scope, FlashService, AuthenticationService) {

	$scope.credentials = {}

	// if(AuthenticationService.isLoggedIn())
	// 	$location.path('/')

	$scope.login = function() {
		AuthenticationService.logIn($scope.credentials)
	}

	$scope.logout = function() {
		AuthenticationService.logOut()
	}
}]
