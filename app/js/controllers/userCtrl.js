'use strict';

/* Controleur de la user page */

angular.module('alveolus.userCtrl', []).
controller('UserCtrl', function($scope, $routeParams, UserService, SessionService) {

	console.log('isLogged:'+$scope.isLogged+' user.id:'+$scope.user.id);

	if($scope.isLogged){
		$scope.user=UserService.get({id: $scope.user.id});
	}
	else $scope.openModalLogin();
	
	
	$scope.onSubmit=function(user){
		console.log('$scope.onSubmit');
		UserService.updateUser({userId : user.id, user : user}, function(data){
			$scope.user=data;
			console.log('callback '.data);
		});	
	}

	// vincent.poulain2@gmail.com
});