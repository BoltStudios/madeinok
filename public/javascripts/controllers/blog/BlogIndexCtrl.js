function BlogIndexCtrl($scope, $http, AuthenticationService, Blog, SessionService) {
	// Don't create the form data here. Do it on the page and save yourself troubles.
	$scope.title = "Check out all the super sweet blogs we've got"

	$scope.loggedIn = AuthenticationService.isLoggedIn()
	$scope.admin = $scope.loggedIn

	$scope.blogs = Blog.query()
}