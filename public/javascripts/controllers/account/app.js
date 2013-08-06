var app = angular.module('AccountApp', ['ngResource', 'authentication-service'])
	
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/account', 		 { controller: AccountIndexCtrl, 	templateUrl: '/account/index'	})
			.when('/account/login',  { controller: AccountSessionCtrl, 	templateUrl: '/account/login'	})
			.when('/account/create', { controller: AccountCreateCtrl, 	templateUrl: '/account/create'	})
			.otherwise({ redirectTo: '/' })
	})

	.factory('User', ['$resource', function($resource) {
		return $resource('/api/users/:id', {userId: '@id'})
	}])

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