function BlogIndexCtrl($scope, $http, AuthenticationService, Blog) {
	// Don't create the form data here. Do it on the page and save yourself troubles.
	$scope.title = "Check out all the super sweet blogs we've got"

	console.log(AuthenticationService.isLoggedIn())
	$scope.loggedIn = true;
	$scope.admin = true;

	$scope.blogs = Blog.query()
}