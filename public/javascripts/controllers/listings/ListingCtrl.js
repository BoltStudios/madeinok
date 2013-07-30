function ListingCtrl($scope, $http, Listing) {
	$scope.count = 0
	$scope.listings = Listing.query()


	$scope.hasError = function() {
		return $scope.listings.length == 1 && $scope.listings[0].error
	}

	// THIS DOESN'T GO HERE, BUT IT DOES FOR TESTING.
	$scope.destroy = function(id) {
		console.log('deleting')
		Listing.delete({id: id}, function(response) {
			$scope.listings = _.filter($scope.listings, function(el) { return el._id != id})
		})
	}
}