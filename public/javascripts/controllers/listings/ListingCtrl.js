function ListingCtrl($scope, $http, ListingService) {
	$scope.listings = []
	$scope.count = 0

	ListingService.retrieve().success(function(response) {
		$scope.listings = response
		$scope.count = response.length
	}).error(function(response) {
		$scope.listings.push('Couldn\'t load entries')
	})
}