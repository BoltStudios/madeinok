var EventViewCtrl = ['$scope', '$routeParams', 'Event', function($scope, $routeParams, Event) {

	// view data
	// Fields will be stored here as a JSON object
	$scope.viewData = {}

	$scope.eventId = $routeParams.id//'51f148b1529a2d7d63000001'

	$scope.loggedIn = true;
	$scope.admin = true;

	// If a eventId is available, the fields should be populated (we're viewing it after all)
	if($scope.eventId && Object.keys($scope.viewData).length == 0) {
		var entry = Event.get({id: $scope.eventId})
		$scope.viewData = entry
	}

	// Title of the page
	$scope.title = $scope.viewData.title
}]