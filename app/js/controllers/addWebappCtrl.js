'use strict';

/* Controleur de la home page */

angular.module('alveolus.addWebappCtrl', []).
controller('AddWebappCtrl', function($scope,$routeParams,WebappService, SocialService, CategoryService) {


	$scope.webapp=WebappService.new(function(){
		console.log($scope.webapp);
		// $scope.webapp.url = 'http://';
		// $scope.webapp.$save();
	});

	$scope.categories=CategoryService.query(function(){
		console.log($scope.categories);
	});

	$scope.submit=function(webapp){
		console.log('submit');
		console.log(webapp);
		$scope.webapp = webapp;
		console.log($scope.webapp);
		$scope.webapp.$save();
	};


});