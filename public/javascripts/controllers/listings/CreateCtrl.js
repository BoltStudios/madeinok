function CreateCtrl($scope, $location, $http, $routeParams, $injector) {

	// Get the fields from the editor controller
	$injector.invoke(EditorCtrl, this, {$scope: $scope})

	$scope.submit = function() {
		console.log('form data is ' + JSON.stringify($scope.formData))
		$http.post('/api/listings/create', $scope.formData).success(function(response) {
			//$location.path('/')
		}).error(function(response) {
			console.log('oops!')
		})
	}

	$scope.save = function() {
		console.log($scope.formData)
		if(!$scope.listingId) {
			$http.post('/api/listings/create', $scope.formData)
			.success(function(response) {
				$scope.listingId = response._id
			})
			.error(function(response) {

			})
		} else {
			$http.put('/api/listings/edit/' + $scope.listingId, $scope.formData)
			.success(function(response) {
				console.log('got a response... ' + JSON.stringify(response))
			})
			.error(function(response) {

			})
		}
	}

	$scope.nextPage = function() {
		this.save()
		$location.path('/create/' + ++$scope.currentPage);
	}

	$scope.previousPage = function() {
		this.save()
		$location.path('/create/' + --$scope.currentPage);
	}


	$scope.testLogIn = function() {
		var credentials = {username:'hi', password:'haters'}
		AuthenticationService.logIn(credentials)
	}

	$scope.testIsLoggedIn = function() {
		console.log(AuthenticationService.isLoggedIn())
	}

}