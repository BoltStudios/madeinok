var AccountIndexCtrl = ['$scope', '$http', '$location', 'AuthenticationService', function($scope, $http, $location, AuthenticationService) {
	$scope.title = 'Your Account'

	$http.get('/api/users/current').success(function(response) {
		var guid = response ? response.guid : ''
		  , listingPath = '/api/users/'+guid+'/listings'
		  , eventPath = '/api/users/'+guid+'/events'
		  , blogPath = '/api/users/'+guid+'/blogs'

		$http.get(listingPath).success(function(response) {
			var listings = response
			$scope.listings = response
		})
		$http.get(eventPath).success(function(response) {
			var events = response
			$scope.events = response
		})
		$http.get(blogPath).success(function(response) {
			var blogs = response
			$scope.blogs = response
		})
	})

	$scope.viewListing = function(id) {
		location.href = '/listing/#/view/'+id
		//$location.url('/listing/#/view/'+id)
	}

	$scope.editListing = function(id) {
		location.href = '/listing/#/edit/'+id
		//$location.url('/listing/#/edit/'+id)
	}

	$scope.viewEvent = function(id) {
		location.href = '/event/#/view/'+id
		//$location.url('/listing/#/view/'+id)
	}

	$scope.editEvent = function(id) {
		location.href = '/event/#/edit/'+id
		//$location.url('/listing/#/edit/'+id)
	}

	$scope.viewBlog = function(id) {
		location.href = '/blog/#/view/'+id
		//$location.url('/listing/#/view/'+id)
	}

	$scope.editBlog = function(id) {
		location.href = '/blog/#/edit/'+id
		//$location.url('/listing/#/edit/'+id)
	}

	$scope.logout = function() {
		AuthenticationService.logOut()
	}

}]