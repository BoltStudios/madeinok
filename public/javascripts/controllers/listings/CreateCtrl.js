function CreateCtrl($scope, $location, $http, $routeParams) {
	// Don't create the form data here. Do it on the page and save yourself troubles.
	$scope.formData = {}

	$scope.save = function() {
		console.log('form data is ' + JSON.stringify($scope.formData))
		$http.post('/api/listings/create', $scope.formData).success(function(response) {
			//$location.path('/')
		}).error(function(response) {
			console.log('oops!')
		})
	}
}