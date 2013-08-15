function HomeIndexCtrl($scope, $location, $http, $routeParams, Event, Blog, Listing) {
	$scope.events = {}
	$scope.blogs = {}
	$scope.listings = {}
	//$scope.variableName = "variable value"
	$scope.title = "Home/Index" // try commenting this out to see what happens on the view.
	$scope.blurb = "Here at Made In OK, we're developing a crowd sourced and curated web community to help build a central place for Oklahoma innovators, makers, founders and creatives to find local networking events, keep up to date on what's happening in the community, and connect with talent.";
	$scope.yourName = "Example Name"

	if(Object.keys($scope.events).length == 0) {
		var entry = Event.query(function(success) {
			$scope.events = success
		}, function(error) {
			console.log("something went wrong trying to access the events")
			console.log(error)
		})
	}
	if(Object.keys($scope.blogs).length == 0) {
		var entry = Blog.query(function(success) {
			$scope.blogs = success
		}, function(error) {
			console.log("something went wrong trying to access the blogs")
			console.log(error)
		})
	}
	if(Object.keys($scope.listings).length == 0) {
		var entry = Listing.query(function(success) {
			$scope.listings = success
		}, function(error) {
			console.log("something went wrong trying to access the listings")
			console.log(error)
		})
	}
}