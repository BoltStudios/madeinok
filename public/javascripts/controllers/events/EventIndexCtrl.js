function EventIndexCtrl($scope, $http, Event) {
	// Don't create the form data here. Do it on the page and save yourself troubles.
	$scope.title = "Helping you exhaust your leisure since 2013"

	$scope.loggedIn = true;
	$scope.admin = true;

	$scope.events = Event.query()
}