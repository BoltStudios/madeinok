var AccountIndexCtrl = ['$scope', '$http', '$location', 'SessionService', function($scope, $http, $location, SessionService) {
	$scope.title = 'Your Account'

	$http.get('/api/users/current').success(function(response) {
		var guid = response ? response.guid : ''
		  , path = '/api/users/'+guid+'/listings/'

		$http.get(path).success(function(response) {
			var listings = response
			$scope.listings = response
			console.log($scope.listings)
		})
	})

}]