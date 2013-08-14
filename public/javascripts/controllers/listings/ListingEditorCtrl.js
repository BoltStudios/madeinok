/* The edit and create controllers are going to be very similar, so inherit from this */
var ListingEditorCtrl = ['$scope', '$location', '$http', '$routeParams', 'AuthenticationService', 'Listing', function($scope, $location, $http, $routeParams, AuthenticationService, Listing) {

	// Form data
	// Fields will be stored here as a JSON object
	$scope.formData = {}
	$scope.phrase = {}
	$scope.formData.isHiring = false;
	$scope.formData.hasInternships = false;


	// If the form has been saved once already, then we want to edit a form with an ID, 
	// not create a new one and save it agan, so track the ID of the form being manipulated.
	$scope.listingId = $routeParams.id//'51f148b1529a2d7d63000001'


	// If a listingId is available, the fields should be populated (we're editing)
	// If the form data has information already (creating and saving), don't hit the DB again
	if($scope.listingId && Object.keys($scope.formData).length != 0) {
		var entry = Listing.get({id: $scope.listingId}, function(success) {
			$scope.formData = success
			$scope.loadProductTypes(success)
			$scope.loadPhrase(success)
		}, function(error) {

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
  	$scope.companyTypes = ['Technology', 'Agency', 'Dev Shop', 'Service Firm', 'Incubator/Accelerator', 'VC/Angel Fund', 'Other']
  	$scope.formData.companyType = $scope.companyTypes[0]

	// Product types
	$scope.productTypes = [
		{productType: 'Website', value: false}
	  , {productType: 'Mobile App', value: false}
	  , {productType: 'Consumer Website', value: false}
	  , {productType: 'Games', value: false}
	  , {productType: 'Pharmaceutical', value: false}
	  , {productType: 'SaaS / PaaS / IaaS', value: false}
	  , {productType: 'Physical Product', value: false}
	  , {productType: 'Service Offering', value: false}
	  , {productType: 'Medical Device', value: false}
	  , {productType: 'Other', value: false} // check out otherProductTypeChecked if this index changes
	]
	$scope.formData.productTypesOtherDescription = ''


	// Industry focus
	$scope.formData.industryFocus = {}
	$scope.industryFocuses = ['Energy', 'Healthcare/Biotech', 'Retail/E-Commerice', 'Consumer Web', 'Gaming',
							  'Marketing/Advertising', 'IT', 'Media', 'Finance', 'Education', 'Sports', 'Travel',
							  'Business Services', 'Food', 'Other']
	$scope.formData.industryFocus.option = $scope.industryFocuses[0]
	$scope.formData.industryFocus.description = ''


	// Primary Customers
	$scope.primaryCustomers = ['Consumer', 'Business', 'Non-Profit', 'Public Sector', 'Other']
	$scope.formData.primaryCustomer = $scope.primaryCustomers[0]


	// Last funding round closed
	$scope.fundingRounds = ['None/Bootstrapped', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D+']
	$scope.formData.fundingRound = $scope.fundingRounds[0]


	// Total raised to date
	$scope.totalRaisedValues = ['', '$0', '<$100k', '$100k - $499k', '$500k - $999k', '$1M - $5M', '$5M - $10M', '$10M+']
	$scope.formData.totalRaised = $scope.totalRaisedValues[0]


	// Annualized revenue
	$scope.annualRevenues = ['', 'Pre-revenue', '<$100k', '$100k - $499k', '$500k - $999k', '$1M - $5M', '$5M - $10M', '$10M+']
	$scope.formData.annualRevenue = $scope.annualRevenues[0]


	// Founders
	$scope.formData.founders = [
		{name: '', email: '', title: ''}
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
		$scope.formData.founders.push({name: '', email: '', title: ''})
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

		$scope.saveProductTypes()
		$scope.saveUrls()
		$scope.saveTwitter()
		$scope.savePhrase()

		!$scope.listingId ? httpCreate(callback) : httpEdit(callback)
		$scope.info = ''
		$scope.success = 'Saved your changes'
	}


	$scope.saveProductTypes = function() {
		if(!$scope.otherProductTypeChecked()) {
			$scope.formData.productTypesOtherDescription = ''
		}
		$scope.formData.productTypes = $scope.productTypes
	}


	/* Appends http:// to all the urls */
	$scope.saveUrls = function() {
		if($scope.formData.websiteUrl && !$scope.formData.websiteUrl.match('http://'))
			$scope.formData.websiteUrl = 'http://' + $scope.formData.websiteUrl

		if($scope.formData.linkedInUrl && !$scope.formData.linkedInUrl.match('http://'))
			$scope.formData.linkedInUrl = 'http://' + $scope.formData.linkedInUrl

		if($scope.formData.angelListUrl && !$scope.formData.angelListUrl.match('http://'))
			$scope.formData.angelListUrl = 'http://' + $scope.formData.angelListUrl

		if($scope.formData.hiringUrl && !$scope.formData.hiringUrl.match('http://'))
			$scope.formData.hiringUrl = 'http://' + $scope.formData.hiringUrl
	}

	$scope.saveTwitter = function() {
		if($scope.formData.twitterHandle && !$scope.formData.twitterHandle.match('@'))
			$scope.formData.twitterHandle = '@'+$scope.formData.twitterHandle
	}

	$scope.savePhrase = function() {
		$scope.formData.phrase = {}
		$scope.formData.phrase.developing = $scope.phrase.developing
		$scope.formData.phrase.helping = $scope.phrase.helping
		$scope.formData.phrase.why = $scope.phrase.why
	}


	$scope.loadProductTypes = function(entry) {
		_.assign($scope.productTypes, entry.productTypes)
	}

	$scope.loadPhrase = function(entry) {
		_.assign($scope.phrase, entry.phrase)
	}


	/* Creates a new listing.
	 * This is whacky because I have to pass around a callback in order to get things to 
	 * execute in the right order.
	 * save() -> Create (wait for a successful save) -> update the ID -> callback()
	*/
	var httpCreate = function(callback) {
		$scope.saveProductTypes()
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
		}).$then(function(response) {
			if(callback) callback()
		}, function(error) {

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


	$scope.highlight = function(otherElement) {
		console.log(otherElement)
	}

}]