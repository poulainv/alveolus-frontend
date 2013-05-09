'use strict';

/* Controleur de la home page */

angular.module('alveolus.webAppDescCtrl', []).
controller('WebAppDescCtrl', function($scope, $routeParams, Webapp, WebappFacebook, User, Categorie, WebappComments) {

	$scope.result=Webapp.get({id: $routeParams.webAppId});
	// $scope.user=$scope.webapp.user_id ? $scope.webapp.user_id : 'X';
	$scope.facebook_id="294735233916083";
	// $scope.facebook=WebappFacebook.get({id: $scope.facebook_id}); // Requête cross domain ne marche pas

	$scope.user=User.get({id: 1});
	$scope.category=Categorie.get({id: 2}); // $scope.result.webapp.category_id Ne marche pas !!
	// $scope.comments=WebappComments.get({id: $routeParams.webAppId}); // probleme retour résultats ???
	$scope.comments=[{"body":"Very interesting","created_at":"2013-05-07T18:14:25Z","id":5,"rating":3,"updated_at":"2013-05-07T18:14:25Z","user_id":2,"webapp_id":2},{"body":"En anglais, je comprends rien","created_at":"2013-05-07T18:14:25Z","id":4,"rating":4,"updated_at":"2013-05-07T18:14:25Z","user_id":1,"webapp_id":2}];

	$scope.save = function() {
    $scope.comment = angular.copy($scope.comment, $scope.master);
    alert($scope.comment.rating);
  };
});