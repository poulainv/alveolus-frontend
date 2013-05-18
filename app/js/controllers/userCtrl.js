'use strict';

/* Controleur de la user page */

angular.module('alveolus.userCtrl', []).
controller('UserCtrl', function($scope, $routeParams, UserService, SessionService) {

	$scope.authorized=SessionService.authorized();
	console.log('authorized='+SessionService.authorized());

	if(SessionService.authorized()==false){
		$scope.openModalLogin();	
	} 

	$scope.user.avatar_file_name="img/avatar.jpg";
	
	
	$scope.onSubmit=function(){
		// User.put();	
	}

	// vincent.poulain2@gmail.com
});