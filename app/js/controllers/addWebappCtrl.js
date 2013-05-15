'use strict';

/* Controleur de la home page */

angular.module('alveolus.addWebappCtrl', []).
controller('AddWebappCtrl', function($scope,$routeParams,WebappService, SocialService) {
	$scope.webapp=WebappService.getNewApp();

	$scope.onSubmit=function(){
		WebappService.saveNewApp($scope.webapp, function(){
			success(function(data) {alert(data);});
		});
	}

});