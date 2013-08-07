function ListingCreateCtrl($scope, $location, $http, $routeParams, $injector, AuthenticationService) {

	// Get the fields from the editor controller
	$injector.invoke(ListingEditorCtrl, this, {$scope: $scope})

	// Title of the page
	$scope.title = 'Create a Listing'


	$scope.testLogIn = function() {
		var credentials = {email:'hi', password:'haters'}
		AuthenticationService.logIn(credentials)
	}

	$scope.testIsLoggedIn = function() {
		console.log(AuthenticationService.isLoggedIn())
	}

}