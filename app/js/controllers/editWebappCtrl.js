'use strict';

/* Controleur de la home page */

angular.module('alveolus.editWebappCtrl', []).
controller('EditWebappCtrl', function($scope,$routeParams,$location,WebappService) {

	$scope.webapp = WebappService.get({id:$routeParams.webAppId});

	$scope.submit = function(webapp){
		console.log('edit webapp :');
		console.log(webapp);
		WebappService.update(webapp);
		$location.path('/');

	}


});