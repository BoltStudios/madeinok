var ListingUnclaimedCtrl = ['$window', '$scope', '$http', '$location', 'Listing', '$routeParams', function($window, $scope, $http, $location, Listing, $routeParams) {
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


	$scope.unclaimed = true

	$scope.claim = function(id){
		var claimPath = '/api/listings/claim/' + id
		console.log('##### claimPath: ' + claimPath)
		$http.post(claimPath)
			.success(function(response) {
				var listing = response
				if(listing.creatorId){
					$window.location.href = "/listing/#/view/" + listing._id
				}
			})
	}
}]