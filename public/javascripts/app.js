var app = angular.module('StartupApp', ['ngResource'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', { controller: ListingCtrl, templateUrl: '/listings/index' })
			.when('/create', { controller: CreateCtrl, templateUrl: '/listings/create' })
			.otherwise({ redirectTo: '/' })
	})

/* Does not allow users to input any more characters than the 
   limit defined by the attribute maxlengthlimit
*/
app.directive('maxlengthlimit', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, ngModelCtrl) {
			var maxLength = Number(attrs.maxlengthlimit)
			function fromUser(text) {
				if(text.length > maxLength) {
					var transformedInput = text.substring(0, maxLength)
					ngModelCtrl.$setViewValue(transformedInput);
            		ngModelCtrl.$render();
            		return transformedInput;
				}
				return text
			}
			ngModelCtrl.$parsers.push(fromUser)
		}
	}
})