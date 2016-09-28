(function() {
	angular.module('demoApp', ['ng-recorder']).controller('demoCtrl', [
		'$scope','$window', function($scope, $window){
			
			$scope.dataValue = '';
			
			$scope.recorderOptions = {
				streamType: 'audio'
			};
		}
	]);
})();