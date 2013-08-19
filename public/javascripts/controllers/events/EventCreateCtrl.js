function EventCreateCtrl($scope, $location, $http, $routeParams, $injector, Event) {

	// Get the fields from the editor controller
	$injector.invoke(EventEditorCtrl, this, {$scope: $scope})

	// Title of the page
	$scope.title = 'Create an Event'
	$scope.formData.date = new Date()
}