function BlogCreateCtrl($scope, $location, $http, $routeParams, $injector, AuthenticationService, Blog) {

	// Get the fields from the editor controller
	$injector.invoke(BlogEditorCtrl, this, {$scope: $scope})

	// Title of the page
	$scope.title = 'Create a Blog'
	$scope.formData.date = new Date()
}