'use strict';

/* Controleur de la home page */

angular.module('alveolus.mainCtrl', []).
controller('MainCtrl', function($scope,$routeParams,$location,WebappService) {


	$scope.search = function(content){
		$location.path('/alveoles/search/'+content);
	};
});