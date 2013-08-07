/* The edit and create controllers are going to be very similar, so inherit from this */
function ListingEditorCtrl($scope, $location, $http, $routeParams, AuthenticationService, Listing) {

	// Form data
	// Fields will be stored here as a JSON object
	$scope.formData = {}


	// If the form has been saved once already, then we want to edit a form with an ID, 
	// not create a new one and save it agan, so track the ID of the form being manipulated.
	$scope.listingId = $routeParams.id//'51f148b1529a2d7d63000001'


	// If a listingId is available, the fields should be populated (we're editing)
	// If the form data has information already (creating and saving), don't hit the DB again
	if($scope.listingId && Object.keys($scope.formData).length == 0) {
		var entry = Listing.get({id: $scope.listingId})
		$scope.formData = entry
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
  	$scope.companyTypes = ['Technology', 'Agency', 'Dev Shop', 'Service Firm', 'Incubator/Accelerator', 'VC/Angel Fund', 'Other']
  	$scope.formData.companyType = $scope.companyTypes[0]

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


	// Industry focus
	$scope.formData.industryFocus = {}
	$scope.industryFocuses = ['Energy', 'Healthcare/Biotech', 'Retail/E-Commerice', 'Consumer Web', 'Gaming',
							  'Marketing/Advertising', 'IT', 'Media', 'Finance', 'Education', 'Sports', 'Travel',
							  'Business Services', 'Food', 'Other']
	$scope.formData.industryFocus.option = $scope.industryFocuses[0]


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
		return $scope.formData.industryFocus == 'Other'
	}

	$scope.addFounder = function() {
		$scope.founders.push({firstName: '', lastName: '', emamil: '', title: ''})
	}


	/* Submits the listing, either for editing or creation.
	 * Assigns the listing's published value to true.
	*/
	$scope.submit = function() {
		$scope.formData.isPublished = true
		$scope.save()
	}


	/* Saves the form data to the database.
	 * Does not publish the entry (that's submit)
	 * 
	 * This uses a callback because I need to ensure changes occur before going to the next page.
	*/
	$scope.save = function(callback) {
		$scope.info = 'Saving...'
		!$scope.listingId ? httpCreate(callback) : httpEdit(callback)
		$scope.info = ''
		$scope.success = 'Saved your changes'
	}


	/* Creates a new listing.
	 * This is whacky because I have to pass around a callback in order to get things to 
	 * execute in the right order.
	 * save() -> Create (wait for a successful save) -> update the ID -> callback()
	*/
	var httpCreate = function(callback) {
		Listing.save({}, $scope.formData, function(response) {
		}).$then(function(response) {
			$scope.listingId = response.data._id
			if(callback) callback()
		}, function(error) {
		})
	}


	/* Edits a listing
	*/
	var httpEdit = function(callback) {
		Listing.save({id: $scope.listingId}, $scope.formData, function(response) {
		})
	}


	/* Since this controller is only going to be used on an edit or create page,
	 * I'm making the assumption that the path to those pages will be something containing 
	 * the words "create" or "edit". This returns one of those strings.
	 */
	 var pagePath = function(id) {
	 	function pathBuilder() {
	 		return $location.path().match(/\bcreate/) != null ? ('/create/' + id + '/') : ('/edit/' + id + '/')
	 	}
	 	if(!id)
	 		id = $scope.listingId

	 	return pathBuilder()
	 }


	$scope.nextPage = function() {
		var increment = function() {
			$location.path(pagePath() + ++$scope.currentPage)
		}
		this.save(increment)
	}


	$scope.previousPage = function() {
		var decrement = function() {
			$location.path(pagePath() + --$scope.currentPage)
		}
		this.save(decrement)
	}

}