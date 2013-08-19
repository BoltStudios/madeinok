var BlogEditCtrl = ['$scope', '$injector', function($scope, $injector) {

	// Get the fields from the editor controller
	$injector.invoke(BlogEditorCtrl, this, {$scope: $scope})

	// Title of the page
	$scope.title = $scope.formData.title ? 'Edit' + $scope.formData.title : 'Edit this Blog'

}]