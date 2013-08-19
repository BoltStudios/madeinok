var BlogIndexCtrl = ['$scope', 'Blog', function($scope, Blog) {
	// Don't create the form data here. Do it on the page and save yourself troubles.
	$scope.title = "Check out all the super sweet blogs we've got"

	$scope.loggedIn = true;
	$scope.admin = true;

	$scope.blogs = Blog.query()
}]