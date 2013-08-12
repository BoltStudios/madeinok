function EventEditCtrl($scope, $location, $http, $routeParams, $injector, Event) {

	// Get the fields from the editor controller
	$injector.invoke(EventEditorCtrl, this, {$scope: $scope})

	// Title of the page
	$scope.title = $scope.formData.title ? 'Edit' + $scope.formData.title : 'Edit this Event'

}