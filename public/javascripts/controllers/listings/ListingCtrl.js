function ListingCtrl($scope, $http) {
	$scope.listings = []
	$scope.count = 0

	$http.get('/api/listings/all').success(function(response) {
		$scope.listings = response
		$scope.count = $scope.listings.length
	}).error(function(response) {
		$scope.listings.push('Couldn\'t load entries')
	})
}