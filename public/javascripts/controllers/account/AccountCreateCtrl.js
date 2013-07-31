function AccountCreateCtrl($scope, $location, $http, $routeParams, User) {
	$scope.title = 'Create Your Account'

	// Hold all the form information here
	$scope.formData = {}

	$scope.register = function() {
		User.save({}, $scope.formData, function(response) {
			$location.path('/')
		})
	}
}