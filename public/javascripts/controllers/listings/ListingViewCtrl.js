var ListingViewCtrl = ['$scope', '$http', '$routeParams', 'Listing', function($scope, $http, $routeParams, Listing) {
	$scope.title = 'hello'
	$scope.item = Listing.get({id: $routeParams.id})

	$scope.isVowel = function(firstLetter) {
		var letter = firstLetter.toLowercase()
		return letter == 'a' || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u'
	}
}]