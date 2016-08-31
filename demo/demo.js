(function() {
	angular.module('demoApp', ['ng-recorder']).controller('demoCtrl', [
		'$scope','$window', function($scope, $window){
			
			$scope.dataValue = '';
			
			$scope.recorderOptions = {
				streamType: 'video',
				flowOpts: {
					target: '/github/ngRecorder/demo/flow-post.php'
				}
			};
		}
	]);
})();