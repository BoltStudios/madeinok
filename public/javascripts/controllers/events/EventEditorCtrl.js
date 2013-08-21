var EventEditorCtrl = ['$scope', '$location', '$http', '$routeParams', 'Event', function($scope, $location, $http, $routeParams, Event) {

	$scope.loggedIn = true;
	$scope.admin = true;

	$scope.formData = {}

	// If the form has been saved once already, then we want to edit a form with an ID, 
	// not create a new one and save it agan, so track the ID of the form being manipulated.
	$scope.eventId = $routeParams.id//'51f148b1529a2d7d63000001'
	// If a eventId is available, the fields should be populated (we're editing)
	// If the form data has information already (creating and saving), don't hit the DB again
	if($scope.eventId && Object.keys($scope.formData).length == 0) {
		var entry = Event.get({id: $scope.eventId}, function(success) {
			$scope.formData = success
			$scope.setDate($scope.formData.date)
		}, function(error) {

		})
	}
    else{
    	$scope.formData.hour = 7
    	$scope.formData.minute = 15
    	$scope.formData.ampm = "PM"
	}
    $scope.hours = getHours()
    $scope.minutes = getMinutes()

    window.scope = $scope
	/* how to add functions to the scope */

	// $scope.functionName = function() {
	// 	return $scope.variableName.value;
	// }

	/* Saves the form data to the database. */
	$scope.save = function() {
		//here we decide whether we're creating or editing a event post
		$scope.formData.date = $scope.getDate()
		!$scope.eventId ? httpCreate() : httpEdit()
	}

	/* Creates a new event post. */
	var httpCreate = function() {
		Event.save({}, $scope.formData, function(response) {
			$scope.eventId = response._id
		})
		
	}

	/* Edits a event post. */
	var httpEdit = function() {
		Event.save({id: $scope.eventId}, $scope.formData)
	}

	$scope.delete = function(){
		!$scope.eventId ? function(){} : httpDelete()
	}

	/* Edits a event post. */
	var httpDelete = function() {
		Event.delete({id: $scope.eventId})
	}
	/* Since this controller is only going to be used on an edit or create page,
	 * I'm making the assumption that the path to those pages will be something containing 
	 * the words "create" or "edit". This returns one of those strings.
	 */
	 var pagePath = function() {
	 	var path = $location.path().match(/\bcreate/) != null ? '/create/' : ('/edit/' + $scope.eventId + '/')
	 	return path
	 }

	/* need to have a list of selectable times */
	function getHours(){
		var hours = []
		var hour = 1
		while (hour < 13){
			hours.push(hour)
			hour++
		}
		return hours
	}
	function getMinutes(){
		var minutes = []
		minute = 0
		while (minute < 60){
			minutes.push(minute)
			minute += 15
		}
		return minutes
	}
	/* builds a date object from fields on the scope */
	$scope.getDate = function(){
		var date = new Date()
		date.setYear($scope.formData.year)
		date.setMonth($scope.formData.month - 1)
		date.setDate($scope.formData.day)
		var hour = $scope.formData.ampm == "PM" ? $scope.formData.hour+12%24 : $scope.formData.hour 
		date.setHours(hour)
		date.setMinutes($scope.formData.minute)
		return date
	}
	/* sets the fields on the scope from a date object */
	$scope.setDate = function(date){
		var newDate = new Date(date)
		$scope.formData.year = newDate.getFullYear()
		$scope.formData.month = newDate.getMonth() + 1
		$scope.formData.day = newDate.getDate()
		var hours = newDate.getHours()
		$scope.formData.hour = (hours === 0 || hours === 12) ? 12 : hours%12
		$scope.formData.minute = newDate.getMinutes()
		$scope.formData.ampm = hours < 12 ? "AM" : "PM" 
	}

 }]
