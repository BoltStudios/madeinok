var AccountSessionCtrl = ['$scope', '$routeParams', '$window', 'FlashService', 'AuthenticationService', function($scope, $routeParams, $window, FlashService, AuthenticationService) {

	$scope.credentials = {}

	// if(AuthenticationService.isLoggedIn())
	// 	$location.path('/')
	$scope.returnUrl = $routeParams.returnUrl

	$scope.login = function() {
		AuthenticationService.logIn($scope.credentials)
	}

	$scope.logout = function() {
		AuthenticationService.logOut()
	}

	$scope.twitterAuth = function(){
		$window.location.href = '/auth/twitter' + ($scope.returnUrl ? "/?returnUrl=" + $scope.returnUrl : "")
	}

	$scope.facebookAuth = function(){
		$window.location.href = '/auth/facebook' + ($scope.returnUrl ? "/?returnUrl=" + $scope.returnUrl : "")
	}

}]
