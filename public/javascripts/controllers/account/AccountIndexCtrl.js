var AccountIndexCtrl = ['$scope', '$http', '$location', 'AuthenticationService', function($scope, $http, $location, AuthenticationService) {
	$scope.title = 'Your Account'

	$http.get('/api/users/current').success(function(response) {
		var guid = response ? response.guid : ''
		  , path = '/api/users/'+guid+'/listings'

		$http.get(path).success(function(response) {
			var listings = response
			$scope.listings = response
		})
	})

	$scope.viewListing = function(id) {
		location.href = '/listing/#/view/'+id
		//$location.url('/listing/#/view/'+id)
	}

	$scope.editListing = function(id) {
		location.href = '/listing/#/edit/'+id
		//$location.url('/listing/#/edit/'+id)
	}

	$scope.logout = function() {
		AuthenticationService.logOut()
	}

}]