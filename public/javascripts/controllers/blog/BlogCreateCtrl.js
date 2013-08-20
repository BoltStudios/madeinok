var BlogCreateCtrl = ['$scope', '$injector', function($scope, $injector) {

	// Get the fields from the editor controller
	$injector.invoke(BlogEditorCtrl, this, {$scope: $scope})

	// Title of the page
	$scope.title = 'Create a Blog'
	$scope.formData.date = new Date()
}]