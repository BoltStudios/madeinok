var BlogEditorCtrl = ['$scope', '$location', '$http', '$routeParams', 'Blog', function($scope, $location, $http, $routeParams, Blog) {

	$scope.loggedIn = true;
	$scope.admin = true;

	$scope.formData = {}

	// If the form has been saved once already, then we want to edit a form with an ID, 
	// not create a new one and save it agan, so track the ID of the form being manipulated.
	$scope.blogId = $routeParams.id//'51f148b1529a2d7d63000001'
	// If a blogId is available, the fields should be populated (we're editing)
	// If the form data has information already (creating and saving), don't hit the DB again
	if($scope.blogId && Object.keys($scope.formData).length == 0) {
		var entry = Blog.get({id: $scope.blogId})
		$scope.formData = entry
		// BlogService.retrieve($scope.blogId).success(function(response) {
		// 	$scope.formData = response
		// })
	}


	/* how to add functions to the scope */
	// $scope.functionName = function() {
	// 	return $scope.variableName.value;
	// }

	/* Saves the form data to the database. */
	$scope.save = function() {
		//here we decide whether we're creating or editing a blog post
		!$scope.blogId ? httpCreate() : httpEdit()
	}

	/* Creates a new blog post. */
	var httpCreate = function() {
		Blog.save({}, $scope.formData, function(response) {
			$scope.blogId = response._id
		})
		
	}

	/* Edits a blog post. */
	var httpEdit = function() {
		Blog.save({id: $scope.blogId}, $scope.formData)
	}

	$scope.delete = function(){
		!$scope.blogId ? function(){} : httpDelete()
	}

	/* Edits a blog post. */
	var httpDelete = function() {
		Blog.delete({id: $scope.blogId})
	}
	/* Since this controller is only going to be used on an edit or create page,
	 * I'm making the assumption that the path to those pages will be something containing 
	 * the words "create" or "edit". This returns one of those strings.
	 */
	 var pagePath = function() {
	 	var path = $location.path().match(/\bcreate/) != null ? '/create/' : ('/edit/' + $scope.blogId + '/')
	 	return path
	 }
 }]