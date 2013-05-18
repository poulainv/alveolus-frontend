'use strict';

/* Controleur de la home page */

angular.module('alveolus.mainCtrl', []).
controller('MainCtrl', function($scope,$routeParams,$location,WebappService, SessionService) {

	var alertLogSuccess = { type: 'success', msg: 'Parfait, vous êtes correctement authentifié' } ;
	var alertLogFail = { type: 'error', msg: 'Oops, impossible de vous authentifié' } ;

	$scope.alerts = [];

	$scope.user = SessionService.getUser();

	$scope.search = function(content){
		$location.path('/alveoles/search/'+content);
	};

	$scope.sign_in = function(user){
		console.log($scope.user.email);
		SessionService.sign_in($scope.user,function(user){
			if(user.authorized){
				$scope.user = user ;
				addAlert(alertLogSuccess);
			}else{
				$scope.user = user ;
				addAlert(alertLogFail);
			}
		});
	};


	var addAlert = function(alert) {
		$scope.alerts.push(alert);
	};

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};


	$scope.openModalLogin = function () {
		$scope.shouldBeOpen = true;
	};

	$scope.close = function () {
		$scope.closeMsg = 'I was closed at: ' + new Date();
		$scope.shouldBeOpen = false;
	};

	$scope.opts = {
		backdropFade: true,
		dialogFade:true
	};

});