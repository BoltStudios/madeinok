var AccountSessionCtrl = ['$scope', '$routeParams', '$window', 'FlashService', 'AuthenticationService', function($scope, $routeParams, $window, FlashService, AuthenticationService) {

	$scope.credentials = {}

	// if(AuthenticationService.isLoggedIn())
	// 	$location.path('/')
	$scope.returnUrl = $routeParams.returnUrl
	$scope.fragment = $routeParams.fragment
	console.log($scope.returnUrl)
	console.log($scope.fragment)



	$scope.login = function() {
		AuthenticationService.logIn($scope.credentials)
	}

	$scope.logout = function() {
		AuthenticationService.logOut()
	}

	$scope.twitterAuth = function(){
		$window.location.href = '/auth?authService=twitter' + 
		($scope.returnUrl ? "&returnUrl=" + $scope.returnUrl + 
			($scope.fragment ? "&fragment=" + $scope.fragment : "")
		: "&returnUrl=/account/#/home")
	}

	$scope.facebookAuth = function(){
		$window.location.href = '/auth?authService=facebook' + 
		($scope.returnUrl ? "&returnUrl=" + $scope.returnUrl + 
			($scope.fragment ? "&fragment=" + $scope.fragment : "")
		: "&returnUrl=/account/#/home")
	}

}]
