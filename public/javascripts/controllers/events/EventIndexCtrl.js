var EventIndexCtrl = ['$scope', '$http', 'Event', function($scope, $http, Event) {
	// Don't create the form data here. Do it on the page and save yourself troubles.
	$scope.title = "Helping you exhaust your leisure since 2013"

	$scope.loggedIn = true;
	$scope.admin = true;

	Event.query(function(success) {
			events = success
			removeEarlierDatesFromArray(events, new Date())
			$scope.events = events;
		}, function(error) {
			console.log("something went wrong trying to access the events")
			console.log(error)
		})

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
}]