var app = angular.module('AccountApp', ['ngResource', 'authentication-service', 'user-factory'])
	
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {controller: AccountIndexCtrl, templateUrl: '/account/index', resolve: SessionMaster.resolve})
			.when('/login', {controller: AccountSessionCtrl, templateUrl: '/account/login'})
			.when('/create', {controller: AccountCreateCtrl, templateUrl: '/account/create'})
			.otherwise({ redirectTo: '/' })
	})


	// add field-match='path.to.element.in.scope'
	// check with ng-show='form.thisField.$error.fieldMatch'
	.directive('fieldMatch', function () {
    	return {
        	require: 'ngModel',
        	link: function (scope, elm, attrs, ctrl) {
	            ctrl.$parsers.unshift(function (viewValue, $scope) {
	            	var pathToValue = attrs.fieldMatch.split('.')
	            	  , value = scope

	            	for(var path = 0; path < pathToValue.length; path++) {
	            		value = value[pathToValue[path]]
	            	}

	                var noMatch = viewValue != value
	                ctrl.$setValidity('noMatch', !noMatch)
	            })
        	}
    	}
	})


	/* Show and hide elements based on the user's role */
	.directive('accessLevel', function() {

	})


	.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
		var interceptor = ['$location', '$q', function($location, $q) {
			function success(response) { return response; }
			
			function error(response) {
				if(response.status == 401)
					$location.path('/login')

				return $q.reject(response)
			}

			return function(promise) {
				return promise.then(success, error)
			}
		}]

		$httpProvider.responseInterceptors.push(interceptor)
	}])
	//     var interceptor = ['$location', '$q', function($location, $q) {  
	//         function success(response) {
	//             return response;
	//         }

	//         function error(response) {
	//             if(response.status === 401) {
	//                 $location.path('/login');
	//                 return $q.reject(response);
	//             }
	//             else {
	//                 return $q.reject(response);
	//             }
	//         }

	//         return function(promise) {
	//             return promise.then(success, error);
	//         }
	//     }

	//     $httpProvider.responseInterceptors.push(interceptor);
	// }])