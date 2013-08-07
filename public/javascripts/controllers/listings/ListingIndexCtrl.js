<<<<<<< HEAD:public/javascripts/controllers/listings/ListingIndexCtrl.js
function ListingIndexCtrl($scope, $http, Listing) {
=======
function ListingIndexCtrl($scope, $http, Listing, $routeParams, AuthenticationService, SessionService) {
>>>>>>> f8372283994c805b2a99ba32cc36b4c505c8a6df:public/javascripts/controllers/listings/ListingIndexCtrl.js
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