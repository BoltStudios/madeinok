var app = angular.module('HomeApp', ['ngResource', 'ngCookies', 'event-factory', 'blog-factory', 'listing-factory'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			//Index routes
			.when('/', 				{ controller: HomeIndexCtrl, 	templateUrl: '/home/index' 		})
			.when('/index', 		{ controller: HomeIndexCtrl, 	templateUrl: '/home/index' 		})
			//About routes
			.when('/about', 		{ controller: HomeAboutCtrl, 	templateUrl: '/home/about' 		})
			.when('/home/about', 	{ controller: HomeAboutCtrl, 	templateUrl: '/home/about' 		})
			//Contact routes
			.when('/contact', 		{ controller: HomeContactCtrl, 	templateUrl: '/home/contact'	})
			.when('/home/contact', 	{ controller: HomeContactCtrl, 	templateUrl: '/home/contact'	})
			//Fallback
			.otherwise({ redirectTo: '/' })
			//$locationProvider.html5Mode(true) /* RIP IE9 */
	})

	app.filter('makeRange', function() {
        return function(input) {
            var lowBound, highBound;
            switch (input.length) {
            case 1:
                lowBound = 0;
                highBound = parseInt(input[0]) - 1;
                break;
            case 2:
                lowBound = parseInt(input[0]);
                highBound = parseInt(input[1]);
                break;
            default:
                return input;
            }
            var result = [];
            for (var i = lowBound; i <= highBound; i++)
                result.push(i);
            return result;
        };
    });
