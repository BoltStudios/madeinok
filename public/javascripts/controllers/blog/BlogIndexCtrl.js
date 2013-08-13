function BlogIndexCtrl($scope, $http, Blog) {
	// Don't create the form data here. Do it on the page and save yourself troubles.
	$scope.title = "Check out all the super sweet blogs we've got"

	$scope.admin = true;

	$scope.blogs = [
		{title: "First Blog Post", body: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.', date: "07/29/13 08:29:15.0004"},
		{title: "Second Blog Post", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", date: "07/29/13 08:39:53.817"},
		{title: "Third Blog Post", body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).", date: "07/29/13 08:40:34.542"}
	];

	$scope.count = 0
	$scope.blogs = Blog.query()


	$scope.hasError = function() {
		return $scope.blogs.length == 1 && $scope.blogs[0].error
	}

	// THIS DOESN'T GO HERE, BUT IT DOES FOR TESTING.
	$scope.destroy = function(id) {
		console.log('deleting')
		Listing.delete({id: id}, function(response) {
			$scope.listings = _.filter($scope.listings, function(el) { return el._id != id})
		})
	}
}