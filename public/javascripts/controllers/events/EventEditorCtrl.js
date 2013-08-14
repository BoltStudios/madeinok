function EventEditorCtrl($scope, $location, $http, $routeParams, Event) {

	$scope.loggedIn = true;
	$scope.admin = true;

	$scope.formData = {}

	// If the form has been saved once already, then we want to edit a form with an ID, 
	// not create a new one and save it agan, so track the ID of the form being manipulated.
	$scope.eventId = $routeParams.id//'51f148b1529a2d7d63000001'
	// If a eventId is available, the fields should be populated (we're editing)
	// If the form data has information already (creating and saving), don't hit the DB again
	if($scope.eventId && Object.keys($scope.formData).length == 0) {
		var entry = Event.get({id: $scope.eventId})
		$scope.formData = entry

		//We need to turn that date back into something that's editable.
		//However, for whatever reason $scope.formData.date == undefined AND entry.date == undefined
		console.log($scope.formData.date); 
		console.log(entry.date);
		//Yet, whenever I inspect the window.scope.formData variable date is clearly defined, or if I alert $scope.formData then date is also clearly defined
		//I think the asynch processing might be causing a data error here.
		var date1 = $scope.formData.date
		var date2 = entry.date
		console.log(date1)
		console.log(date2)
		var date = new Date(date)// for whatever reason you have to new up a date from the string. js is dumb
		//this is also working client side with new Date(window.scope.formData.date);
		console.log(date)
		window.date = date
		$scope.formData.year = date.getFullYear()
		$scope.formData.month = date.getMonth() + 1
		$scope.formData.day = date.getDate()
		$scope.formData.hour = date.getHours()
		$scope.formData.minutes = date.getMinutes()
	}
    else{
    	$scope.formData.hour = 7
    	$scope.formData.minute = 15
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
	$scope.getDate = function(){
		var date = new Date()
		date.setYear($scope.formData.year)
		date.setMonth($scope.formData.month - 1)
		date.setDate($scope.formData.day)
		var hour = $scope.formData.ampm == "PM" ? $scope.formData.hour+12%24 : $scope.formData.hour 
		date.setHours(hour)
		date.set
		date.setMinutes($scope.formData.minute)
		return date
	}
 }