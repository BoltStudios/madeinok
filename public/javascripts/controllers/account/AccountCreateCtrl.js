function AccountCreateCtrl($scope, $location, $http, $routeParams, User, AuthenticationService) {
	$scope.title = 'Create Your Account'

	// Hold all the form information here
	$scope.formData = {}

	// var test = User.get({id:'51fa8500796589012f000001'}, function() {

	// }, function(response) {
	// 	console.log('... ' + JSON.stringify(response))
	// })
	// console.log(test)

	// Create the user, log them in, redirect to account index
	$scope.register = function() {
		User.save({}, $scope.formData, function(response) {
			var credentials = {email: $scope.formData.email, password: $scope.formData.password}
			AuthenticationService.logIn(credentials)
		})
	}
}