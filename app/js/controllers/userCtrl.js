'use strict';

/* Controleur de la user page */

angular.module('alveolus.userCtrl', []).
controller('UserCtrl', function($scope, $routeParams, User) {

	$scope.user = User.get({id: $routeParams.userId});
	$scope.user = $scope.user ? $scope.user : 'Bonjour monsieur X';
});