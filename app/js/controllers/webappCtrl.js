'use strict';

/* Controleur de la home page */

angular.module('alveolus.webappCtrl', []).
controller('WebappCtrl', function($scope,$routeParams,Webapp) {

	// $scope.$on('$viewContentLoaded', homeRdy);

	$scope.site = Webapp.get({id:$routeParamsid});

});