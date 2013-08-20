function BlogIndexCtrl($scope, $http, AuthenticationService, Blog) {
	// Don't create the form data here. Do it on the page and save yourself troubles.
	$scope.title = "Check out all the super sweet blogs we've got"

	console.log(AuthenticationService.isLoggedIn())
	$scope.loggedIn = true;
	$scope.admin = true;

	$scope.blogs = {}
	if(Object.keys($scope.blogs).length == 0) {
		var entry = Blog.query(function(success) {
			success.sort(function(a,b){
			  a = new Date(a.date);
			  b = new Date(b.date);
			  return a<b?-1:a>b?1:0;
			})
			$scope.blogs = success.reverse()
		}, function(error) {
			console.log("something went wrong trying to access the blogs")
			console.log(error)
		})
	}
}