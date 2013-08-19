var EventCreateCtrl = ['$scope', '$injector', function($scope, $injector) {

	// Get the fields from the editor controller
	$injector.invoke(EventEditorCtrl, this, {$scope: $scope})

	// Title of the page
	$scope.title = 'Create an Event'
	$scope.formData.date = new Date()
	$scope.formData.imageUrl = "../images/default_event.jpg";
}]