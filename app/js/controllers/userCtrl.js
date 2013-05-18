'use strict';

/* Controleur de la user page */

angular.module('alveolus.userCtrl', []).
controller('UserCtrl', function($scope, $routeParams, User) {

	$scope.user = User.get({id: $routeParams.userId}, function(){
		$scope.user.avatar_file_name="img/avatar.jpg";
		$scope.user.pseudo="SuperPseudo";
		comments=User.getComments();
	});
	
	$scope.onSubmit=function(){
		// User.put();	
	}
});