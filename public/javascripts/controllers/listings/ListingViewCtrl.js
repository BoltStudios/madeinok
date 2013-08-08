function ListingViewCtrl($scope, $http, $routeParams, Listing) {
	$scope.title = 'hello'
	$scope.item = Listing.get({id: $routeParams.id})

	$scope.isVowel = function(firstLetter) {
		var letter = firstLetter.toLowercase()
		return letter == 'a' || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u'
	}
	
	console.log($scope.item)
	// ListingService.retrieve($scope.listingId).success(function(response) {
	// 	$scope.item = response
	// 	console.log($scope.item)
	// }).error(function(response) {
	// 	$scope.item.error = 'Oops'
	// })
}