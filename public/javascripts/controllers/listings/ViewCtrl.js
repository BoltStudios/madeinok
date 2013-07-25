function ViewCtrl($scope, $http, $routeParams, ListingService) {
	$scope.listingId = $routeParams.id
	$scope.item = {}
	$scope.title = 'hello'
	
	ListingService.retrieve($scope.listingId).success(function(response) {
		$scope.item = response
		console.log($scope.item)
	}).error(function(response) {
		$scope.item.error = 'Oops'
	})
}