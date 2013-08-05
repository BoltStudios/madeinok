function CreateCtrl($scope, $location, $http, $routeParams) {
	// Don't create the form data here. Do it on the page and save yourself troubles.
	$scope.title = "Blog/Create"

	$scope.admin = true

	$scope.yourName = "fake name"; // try to grab from cookie
	var date = new Date();
	$scope.postDate = date.toString();
	$scope.postTitle;
	$scope.postBody;

	$scope.rawEditor = false;
}