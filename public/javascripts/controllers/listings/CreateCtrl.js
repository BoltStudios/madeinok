function CreateCtrl($scope, $location, $http, $routeParams) {
	// Don't create the form data here. Do it on the page and save yourself troubles.
	$scope.formData = {}

	$http.get('/api/listings/' + $routeParams.id).success(function(response) {

	}).error(function(response) {
		console.log('oops')
	})

	$scope.save = function() {
		$http.post('/api/listings/create', $scope.formData).success(function(response) {
			$location.path('/')
		}).error(function(response) {
			console.log('oops!')
		})
	}
}