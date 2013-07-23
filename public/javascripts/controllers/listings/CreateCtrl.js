function CreateCtrl($scope, $location, $http, $routeParams) {
	// Don't create the form data here. Do it on the page and save yourself troubles.
	$scope.formData = {}

	// Max characters for the blurbs
	$scope.maxBlurbLength = 250

	// Company Types
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


	// Product types
	$scope.productTypes = [
		{type: 'Website', value: false}
	  , {type: 'Mobile App', value: false}
	  , {type: 'Consumer Website', value: false}
	  , {type: 'Games', value: false}
	  , {type: 'Pharmaceutical', value: false}
	  , {type: 'SaaS / PaaS / IaaS', value: false}
	  , {type: 'Physical Product', value: false}
	  , {type: 'Service Offering', value: false}
	  , {type: 'Medical Device', value: false}
	  , {type: 'Other', value: false} // check out otherProductTypeChecked if this index changes
	]
	$scope.productTypesOtherDescription = ''


	// Industry Focus
	$scope.industryFocuses = [
		{focus: 'Energy'}
	  , {focus: 'Healthcare / Biotech'}
	  , {focus: 'Retail / E-Commerce'}
	  , {focus: 'Consumer Web'}
	  , {focus: 'Gaming'}
	  , {focus: 'Marketing / Advertising'}	
	  , {focus: 'IT'}
	  , {focus: 'Media'}
	  , {focus: 'Finance'}
	  , {focus: 'Education'}
	  , {focus: 'Sports'}
	  , {focus: 'Travel'}
	  , {focus: 'Business Services'}
	  , {focus: 'Food'}  	  
	  , {focus: 'Other'}
	]
	$scope.industryFocus = $scope.industryFocuses[0]
	$scope.industryFocusOtherDescription = ''


	// Primary Customers
	$scope.primaryCustomers = [
		{customer: 'Consumer'}
	  , {customer: 'Business'}
	  , {customer: 'Non-Profit'}
	  , {customer: 'Public Sector'}
	  , {customer: 'Other'}
	]
	$scope.primaryCustomer = $scope.primaryCustomers[0]


	// Last funding round closed
	$scope.fundingRounds = [
		{type: 'Funding / Bootstrapped'}
	  , {type: 'Seed'}
	  , {type: 'Series A'}
	  , {type: 'Series B'}
	  , {type: 'Series C'}
	  , {type: 'Series D+'}
	]
	$scope.fundingRound = $scope.fundingRounds[0]


	// Total raised to date
	$scope.totalRaisedValues = [
		{amount: '$0'}
	  , {amount: '<$100k'}
	  , {amount: '$100k - $499k'}
	  , {amount: '$500k - $999k'}
	  , {amount: '$1M - $5M'}
	  , {amount: '$5M - $10M'}
	  , {amount: '$10M+'}
	]
	$scope.totalRaised = $scope.totalRaisedValues[0]


	// Annualized revenue
	$scope.annualRevenues = [
		{amount: 'Pre-revenue'}
	  , {amount: '<$100k'}
	  , {amount: '$100k - $499k'}
	  , {amount: '$500k - $999k'}
	  , {amount: '$1M - $5M'}
	  , {amount: '$5M - $10M'}
	  , {amount: '$10M+'}
	]
	$scope.annualRevenue = $scope.annualRevenues[0]


	/* Only shows the product type 'other' description if other is selected */
	$scope.otherProductTypeChecked = function() {
		return $scope.productTypes[9].value;
	}

	/* Shows the other description box if other industry type selected */
	$scope.otherIndustrySelected = function() {
		return $scope.industryFocus.focus == 'Other'
	}

	$scope.submit = function() {
		console.log('form data is ' + JSON.stringify($scope.formData))
		$http.post('/api/listings/create', $scope.formData).success(function(response) {
			//$location.path('/')
		}).error(function(response) {
			console.log('oops!')
		})
	}
}