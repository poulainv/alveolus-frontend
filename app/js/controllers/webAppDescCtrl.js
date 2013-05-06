'use strict';

/* Controleur de la home page */

angular.module('alveolus.webAppDescCtrl', []).
controller('WebAppDescCtrl', function($scope, $routeParams, Webapp, WebappFacebook) {

	$scope.site=Webapp.get({id: $routeParams.webAppId});
	$scope.user=$scope.site.user_id ? $scope.site.user_id : 'X';

	$scope.facebook_id="294735233916083";

	$scope.facebook=WebappFacebook.get({id: $scope.facebook_id});
});