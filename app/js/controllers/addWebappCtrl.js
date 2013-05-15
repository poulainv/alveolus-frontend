'use strict';

/* Controleur de la home page */

angular.module('alveolus.addWebappCtrl', []).
controller('AddWebappCtrl', function($scope,$routeParams,WebappService, SocialService) {


	$scope.webapp=WebappService.new(function(){
		console.log($scope.webapp);
		// $scope.webapp.$save();
	});

	$scope.submit=function(webapp){
		console.log('submit');
		console.log(webapp);
		$scope.webapp = webapp;
		console.log($scope.webapp);
		$scope.webapp.$save();
	}

});