function ViewCtrl($scope, $http, $routeParams, Listing) {
	$scope.title = 'hello'
	$scope.item = Listing.get({id: $routeParams.id})
	
	// ListingService.retrieve($scope.listingId).success(function(response) {
	// 	$scope.item = response
	// 	console.log($scope.item)
	// }).error(function(response) {
	// 	$scope.item.error = 'Oops'
	// })
}