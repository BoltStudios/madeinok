var AccountCreateCtrl = ['$scope', 'User', 'AuthenticationService', function($scope, User, AuthenticationService) {
	$scope.title = 'Create Your Account'

	// Hold all the form information here
	$scope.formData = {}

	// Create the user, log them in, redirect to account index
	$scope.register = function() {
		User.save({}, $scope.formData, function(response) {
			var credentials = {email: $scope.formData.email, password: $scope.formData.password}
			AuthenticationService.logIn(credentials)
		})
	}
}]