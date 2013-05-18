'use strict';

/* Controleur de la home page */

angular.module('alveolus.mainCtrl', []).
controller('MainCtrl', function($scope,$routeParams,WebappService) {

	$scope.search = function(content){
		WebappService.setSearchContent(content);
	}
});