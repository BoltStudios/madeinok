function AccountSessionCtrl($scope, $http, $location, FlashService, AuthenticationService) {

	$scope.credentials = {}

	$scope.login = function() {
		AuthenticationService.logIn($scope.credentials)
	}
}