function AboutCtrl($scope, $location, $http, $routeParams) {
	// Don't create the form data here. Do it on the page and save yourself troubles.
	$scope.title = "Home/About"
	$scope.yourName = "Captain James Tiberius Kirk"
}