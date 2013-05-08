'use strict';

/* Controleur de la home page */

angular.module('alveolus.webAppDescCtrl', []).
controller('WebAppDescCtrl', function($scope, $routeParams, Webapp, WebappFacebook, User, Categorie, WebappComments) {

	$scope.result=Webapp.get({id: $routeParams.webAppId});
	// $scope.user=$scope.webapp.user_id ? $scope.webapp.user_id : 'X';
	$scope.facebook_id="294735233916083";
	// $scope.facebook=WebappFacebook.get({id: $scope.facebook_id}); // Requête cross domain ne marche pas

	$scope.user=User.get({id: 1});
	$scope.categorie=Categorie.get({id: 2}); // $scope.result.webapp.category_id Ne marche pas !!
	$scope.comments=WebappComments.get({id: $routeParams.webAppId}); // probleme retour résultat
});