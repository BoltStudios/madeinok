var ListingIndexCtrl = ['$scope', '$http', '$location', 'Listing', '$routeParams', function($scope, $http, $location, Listing, $routeParams) {

	$scope.count = 0
	Listing.query(function(response) {
		$scope.listings = _.filter(response, function(el) { return el.isPublished })
	})

	$scope.hasError = function() {
		return $scope.listings.length == 1 && $scope.listings[0].error
	}

	$scope.viewEntry = function(id) {
		$location.path('/view/'+id)
	}

	/* Edits a listing
	*/
	var httpEdit = function(callback) {
		Listing.save({id: $scope.listingId}, $scope.formData, function(response) {
		}).$then(function(response) {
			if(callback) callback()
		}, function(error) {

		})
	}
}]