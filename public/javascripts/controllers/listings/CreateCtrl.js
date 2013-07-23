function CreateCtrl($scope, $location, $http, $routeParams) {
	// Don't create the form data here. Do it on the page and save yourself troubles.
	$scope.formData = {}

	$scope.companyTypes = [
    	{type: 'Technology'}
      , {type: 'Agency'}
      , {type: 'Dev Shop'}
      , {type: 'Service Firm'}
      , {type: 'Incubator/Accelerator'}
      , {type: 'VC/Angel Fund'}
      , {type: 'Other'}
  	]
	$scope.companyType = $scope.companyTypes[0]

	$scope.submit = function() {
		console.log('form data is ' + JSON.stringify($scope.formData))
		$http.post('/api/listings/create', $scope.formData).success(function(response) {
			//$location.path('/')
		}).error(function(response) {
			console.log('oops!')
		})
	}
}