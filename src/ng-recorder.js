/*! ng-recorder - v0.0.1
* Copyright (c) G. Tomaselli <girotomaselli@gmail.com> 2015; Licensed  
*/
angular.module('ng-recorder', [])
.directive('ngRecorder', ['$window','$parse','$compile', function ($window, $parse, $compile) {
	
	contrFunction = ['$scope', '$timeout', '$element', '$attrs', '$parse', function($scope, $timeout, $element, $attrs, $parse){
			
			$element.recorder($scope.options);
			
			var recorderInstance = $element.data('recorder_data');
			
			$element.recorder('setPreview',$scope.ngModel);
			
			$scope.$watch('ngModel',function(newVal, oldVal){
				if(newVal == oldVal) return;
				$element.recorder('setPreview',newVal);
			});
			
			$element.on('recording_started.recorder',function(){
				$timeout();
			});			
			
			if(!recorderInstance.settings.flowOpts || typeof Flow == 'undefined'){
				// no uploader
				$element.on('recording_ended.recorder',function(){
					var data = $element.recorder('getRecordedData');
					$element.recorder('_blobToDataURL', data, function(dataURI){
						$scope.ngModel = dataURI;
						$timeout();
					});
				});
			} else {
				// we have Flow.js
				$element.on('upload_completed.recorder',function(e, file, message, chunk){
					var ngModelController = $element.data('$ngModelController');
					var err = false;
					// json message?
					try {
						message = JSON.parse(message);
					} catch(err){
						console.log(err);
					}

					if(!message.result || err){
						if(ngModelController){
							ngModelController.$setValidity('uploaded', false);
						}
						return;
					}
					
					if(message.relativePath){
						$scope.ngModel = message.relativePath;
						$timeout();						
					}
				});				
			}
		}];
	
	return({
		scope: {
			options: "=ngrOptions",
			ngModel: "=?"
		},
		restrict: "AE",
		controller: contrFunction
	});
}]);
