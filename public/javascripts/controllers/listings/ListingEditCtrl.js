function ListingEditCtrl($scope, $location, $http, $routeParams, $injector) {

	// Get the fields from the editor controller
	$injector.invoke(ListingEditorCtrl, this, {$scope: $scope})

	// Title of the page
	$scope.title = 'Edit Your Listing'
}