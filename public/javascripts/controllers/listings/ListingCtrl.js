function ListingCtrl($scope, $http, ListingService) {
	$scope.listings = []
	$scope.count = 0

	ListingService.retrieve().success(function(response) {
		$scope.listings = response
		$scope.count = response.length
	}).error(function(response) {
		$scope.listings.push('Couldn\'t load entries')
	})

	// THIS DOESN'T GO HERE, BUT IT DOES FOR TESTING.
	$scope.destroy = function(id) {
		console.log('deleting')
		ListingService.destroy(id).success(function(response) {
			$scope.listings = _.filter($scope.listings, function(el) { return el._id != id})
			//_($scope.listings).filter(function(listing) { return listing._id != id })
		}).error(function(response) {
			console.log('error ' + response)
		})
	}
}