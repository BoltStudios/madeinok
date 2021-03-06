var HomeIndexCtrl = ['$scope', '$location', '$http', '$routeParams', '$anchorScroll', 'Event', 'Blog', 'Listing', function($scope, $location, $http, $routeParams, $anchorScroll, Event, Blog, Listing) {
	$scope.events = {}
	$scope.blogs = {}
	$scope.listings = {}
	//$scope.variableName = "variable value"
	$scope.title = "Home/Index" // try commenting this out to see what happens on the view.
	$scope.yourName = "Example Name"

	if(Object.keys($scope.events).length == 0) {
		var entry = Event.query(function(success) {
			var events = success
			removeEarlierDatesFromArray(events, new Date())
			$scope.events = events
		}, function(error) {
			console.log("something went wrong trying to access the events")
			console.log(error)
		})
	}
	if(Object.keys($scope.blogs).length == 0) {
		var entry = Blog.query(function(success) {
			success.sort(function(a,b){
			  a = new Date(a.date);
			  b = new Date(b.date);
			  return a<b?-1:a>b?1:0;
			})
			$scope.blogs = success
		}, function(error) {
			console.log("something went wrong trying to access the blogs")
			console.log(error)
		})
	}
	if(Object.keys($scope.listings).length == 0) {
		var entry = Listing.query(function(success) {
			success.sort(function(a,b){
			  a = new Date(a.date);
			  b = new Date(b.date);
			  return a<b?-1:a>b?1:0;
			})
			$scope.listings = success
		}, function(error) {
			console.log("something went wrong trying to access the listings")
			console.log(error)
		})
	}

	function removeEarlierDatesFromArray(objectsWithDateProperty, date){
		var latestDate = new Date(date);
		for (var i = objectsWithDateProperty.length - 1; i >= 0; i--) {
			var objectDate = new Date(objectsWithDateProperty[i].date)
			if( objectDate < latestDate){
				objectsWithDateProperty.splice(i,1);
			}
		}
		objectsWithDateProperty.sort(function(a,b){
		  a = new Date(a.date);
		  b = new Date(b.date);
		  return a<b?-1:a>b?1:0;
		})
	}

	$scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll('slow');
   }
}]