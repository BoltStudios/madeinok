// function BlogCreateCtrl($scope, $location, $http, $routeParams) {
// 	// Don't create the form data here. Do it on the page and save yourself troubles.
// 	$scope.title = "Blog/Create"

// 	$scope.admin = true

// 	$scope.yourName = "fake name"; // try to grab from cookie
// 	var date = new Date();
// 	$scope.postDate = date.toString();
// 	$scope.postTitle;
// 	$scope.postBody;

// 	$scope.rawEditor = false;
// }

function BlogCreateCtrl($scope, $location, $http, $routeParams, $injector, AuthenticationService, Blog) {

	// Get the fields from the editor controller
	$injector.invoke(BlogEditorCtrl, this, {$scope: $scope})

	// Title of the page
	$scope.title = 'Create a Blog'
	$scope.formData.date = new Date()

	$scope.testLogIn = function() {
		var credentials = {email:'hi', password:'haters'}
		AuthenticationService.logIn(credentials)
	}

	$scope.testIsLoggedIn = function() {
		console.log(AuthenticationService.isLoggedIn())
	}

}