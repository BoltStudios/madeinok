var app = angular.module('BlogApp', ['ngResource', 'ngCookies', 'authentication-service'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			//index routes					
			.when('/', 				{ controller: BlogIndexCtrl, 	templateUrl: '/blog/index' 	})
			.when('/blog/index',    { controller: BlogIndexCtrl, 	templateUrl: '/blog/index' 	})
			//create routes
			.when('/create', 		{ controller: BlogCreateCtrl, 	templateUrl: '/blog/editor' })
			.when('/new', 			{ controller: BlogCreateCtrl, 	templateUrl: '/blog/create' })
			//edit routes
			//.when('/edit/:id', 		{ controller: BlogEditCtrl, 	templateUrl: '/blog/edit' 	})
			//view routes	
			//.when('/view/:id', 		{ controller: BlogViewCtrl, 	templateUrl: '/blog/view' 	})
			//Fallback
			.otherwise({ redirectTo: '/' })
			//$locationProvider.html5Mode(true) /* RIP IE9 */
	})

	/* This is a Blog resource. By default, a resource has these methods:
	 * get({id: X}) GET 							-> /api/listings/X
	 * save({}, newInfo) POST 						-> /api/listings/
	 * save({id: X}, newInfo) POST (obj.$save())	-> /api/listings/X
	 * query() get 									-> /api/listings
	 * remove({id: X}) POST 						-> /api/listings/X
	 * delete({id: X}) POST 						-> /api/listings/X
	 * All of this gets based on your base URL, which is supplied to the resource
	 * The example URL is included above
	*/
	.factory('Blog', ['$resource', function($resource) {
		return $resource('/api/blogs/:id', {blogId: '@id'})
	}])

app.directive('ckEditor', function () {
    return {
        require: '?ngModel',
        link: function (scope, elm, attr, ngModel) {

            var ck = CKEDITOR.replace(elm[0]);

            if (!ngModel) return;

            ck.on('pasteState', function () {
                scope.$apply(function () {
                    ngModel.$setViewValue(ck.getData());
                });
            });

            ngModel.$render = function (value) {
                ck.setData(ngModel.$viewValue);
            };
        }
    };
});
