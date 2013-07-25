/* The edit and create controllers are going to be very similar, so inherit from this */
function EditorCtrl($scope, $location, $http, $routeParams, AuthenticationService) {

	// Form data
	// Fields will be stored here as a JSON object
	$scope.formData = {}


	// If the form has been saved once already, then we want to edit a form with an ID, 
	// not create a new one and save it agan, so track the ID of the form being manipulated.
	$scope.listingId = $routeParams.id//'51f148b1529a2d7d63000001'


	// If a listingId is available, the fields should be populated (we're editing)
	// If the form data has information already (creating and saving), don't hit the DB again
	if($scope.listingId && Object.keys($scope.formData).length == 0) {
		$http.get('/api/listings/' + $scope.listingId).success(function(response) {
			$scope.formData = response
		}).error(function(response) {
			// TODO
		})
	}

	// Page number of the form
	$scope.currentPage = $routeParams.pageNumber || 1
	$scope.lastPageNumber = 5
	$scope.currentPage = ~~$scope.currentPage > $scope.lastPageNumber || ~~$scope.currentPage < 1 ? 1 : ~~$scope.currentPage

	// Progress bar
	$scope.progress = '50%';

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


	// Founders
	$scope.founders = [
		{firstName: '', lastName: '', email: '', title: ''}
	]


	/* Only shows the product type 'other' description if other is selected */
	$scope.otherProductTypeChecked = function() {
		return $scope.productTypes[9].value;
	}

	/* Shows the other description box if other industry type selected */
	$scope.otherIndustrySelected = function() {
		return $scope.industryFocus.focus == 'Other'
	}

	$scope.addFounder = function() {
		$scope.founders.push({firstName: '', lastName: '', emamil: '', title: ''})
	}


	/* Submits the listing, either for editing or creation.
	 * Assigns the listing's published value to true.
	*/
	$scope.submit = function() {
		$scope.formData.isPublished = true
		var action = !$scope.listingId ? httpCreate() : httpEdit()
		
		action.success(function(response) {
			$location.path('/')
		}).error(function(response) {
			// TODO
		})
	}


	/* Saves the form data to the database.
	 * Does not publish the entry (that's submit)
	*/
	$scope.save = function() {
		if(!$scope.listingId) {
			httpCreate().success(function(response) {
				$scope.listingId = response._id
			}).error(function(response) {
				// TODO
			})
		} else {
			httpEdit().success(function(response) {

			}).error(function(response) {
				// TODO
			})
		}
	}


	/* Creates a new listing
	 * 
	 * Returns a promise.
	 * It's up to the caller to call success() and error()
	*/
	var httpCreate = function() {
		return $http.post('/api/listings/create', $scope.formData)
	}


	/* Edits a listing
	 *
	 * Returns a promise.
	 * It's up to the caller to call success() and error()
	*/
	var httpEdit = function() {
		return $http.put('/api/listings/edit/' + $scope.listingId, $scope.formData)
	}


	/* Since this controller is only going to be used on an edit or create page,
	 * I'm making the assumption that the path to those pages will be something containing 
	 * the words "create" or "edit". This returns one of those strings.
	 */
	 var pagePath = function() {
	 	var path = $location.path().match(/\bcreate/) != null ? '/create/' : ('/edit/' + $scope.listingId + '/')
	 	return path
	 }


	$scope.nextPage = function() {
		this.save()
		$location.path(pagePath() + ++$scope.currentPage);
	}


	$scope.previousPage = function() {
		this.save()
		$location.path(pagePath() + --$scope.currentPage);
	}

}