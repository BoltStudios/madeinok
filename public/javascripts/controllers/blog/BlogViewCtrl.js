var BlogViewCtrl = ['$scope', '$routeParams', 'Blog', function($scope, $routeParams, Blog) {

	// view data
	// Fields will be stored here as a JSON object
	$scope.viewData = {}

	$scope.blogId = $routeParams.id//'51f148b1529a2d7d63000001'

	$scope.loggedIn = true;
	$scope.admin = true;

	// If a blogId is available, the fields should be populated (we're viewing it after all)
	if($scope.blogId && Object.keys($scope.viewData).length == 0) {
		var entry = Blog.get({id: $scope.blogId})
		$scope.viewData = entry
	}

	// Title of the page
	$scope.title = $scope.viewData.title
}]