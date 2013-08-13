var app = angular.module('ListApp', ['ngResource', 'ngCookies', 'authentication-service', 'session-service', 'listing-factory'])

	// Configure routes
	// Check the controllers for paths if you change these.
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', { controller: ListingIndexCtrl, templateUrl: '/listings/index' })
			.when('/create', { controller: ListingCreateCtrl, templateUrl: '/listings/editor', resolve: SessionMaster.resolve })
			.when('/create/:id/:pageNumber', {controller: ListingCreateCtrl, templateUrl: '/listings/editor', resolve: SessionMaster.resolve })
			.when('/create/:pageNumber', { controller: ListingCreateCtrl, templateUrl: '/listings/editor', resolve: SessionMaster.resolve })
			.when('/edit/:id', { controller: ListingEditCtrl, templateUrl: '/listings/editor', resolve: SessionMaster.resolve })
			.when('/edit/:id/:pageNumber', { controller: ListingEditCtrl, templateUrl: '/listings/editor', resolve: SessionMaster.resolve })
			.when('/view/:id', { controller: ListingViewCtrl, templateUrl: '/listings/view' })
			.otherwise({ redirectTo: '/' })
	}])


	/* Does not allow users to input any more characters than the 
	   limit defined by the attribute maxlengthlimit
	   EXAMPLE: <input type='text' maxlengthlimit='some value' />
	*/
	.directive('maxlengthlimit', function() {
		return {
			require: 'ngModel',
			link: function(scope, element, attrs, ngModelCtrl) {
				var maxLength = Number(attrs.maxlengthlimit)
				function fromUser(text) {
					if(text && text.length > maxLength) {
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


	.directive('integerInput', function() {
		return {
			require: 'ngModel',
			link: function(scope, element, attrs, ctrl) {
				function fromUser(text) {
					var transformedInput = text.replace(/[^0-9]/g, '')
					if(transformedInput != text) {
						ctrl.$setViewValue(transformedInput)
						ctrl.$render()
					}
					return transformedInput
				}
				ctrl.$parsers.push(fromUser)
			}
		}
	})