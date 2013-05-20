'use strict';

/* Controleur de la home page */

angular.module('alveolus.mainCtrl', []).
controller('MainCtrl', function($scope,$routeParams,$location,WebappService,SessionService,TagService,FeedbackService) {

	var alertLogSuccess = { type: 'success', msg: 'Parfait, vous êtes correctement authentifié' } ;
	var alertLogFail = { type: 'error', msg: 'Oops, impossible de vous authentifié' } ;
	var alertUnauthorized = { type: 'error', msg: 'Vous devez être authentifié' } ;

	$scope.user = SessionService.getUser();
	$scope.isLogged = SessionService.authorized();
	$scope.search = function(content){
		$location.path('/alveoles/search/'+content);
	};

	// Call SessionService to sin in user with email and password given in modal
	// Update $scope.user of mainControler
	$scope.sign_in = function(user){
		SessionService.sign_in($scope.user,function(user){
			$scope.isLogged = user.authorized ;
			$scope.user = user ;
			$scope.isLogged ? addAlert(alertLogSuccess)  : addAlert(alertLogFail);
			$scope.closeModalLogin();
		});
	};


	// Manage main alert on all pages 
	var addAlert = function(alert) {
		$scope.alerts = [];
		$scope.alerts.push(alert);
	};

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};

	// Reset alert when change location
	$scope.$on('$locationChangeSuccess', function(event) {
		$scope.alerts = [];
	});

	// Manage open and close of modal login
	$scope.openModalLogin = function () {
		$scope.modalLogin = true;
	};


	$scope.closeModalLogin = function () {
		$scope.closeMsg = 'I was closed at: ' + new Date();
		$scope.modalLogin = false;
	};

	$scope.openModalFeedback = function () {
		$scope.modalFeedback = true;
	};

	$scope.closeModalFeedback = function () {
		$scope.modalFeedback = false;
		$scope.closeMsg = 'I was closed at: ' + new Date();
		$scope.feedback = {};
	};

	$scope.sendFeedback = function (content) {
		$scope.closeModalFeedback();
		FeedbackService.sendFeedback(content,function(data){
			console.log(data);
		});
	}

	$scope.opts = {
		backdropFade: true,
		dialogFade:true
	};


	$scope.tags=TagService.query(function(){

		var tagNames = [];
		for(var i in $scope.tags){
			tagNames.push($scope.tags[i].name);
		}

		$('#searchInput').typeahead({
			source: tagNames,
			updater:function (item) {
				$scope.$apply($scope.searchContent = item);
				return item;
			}
		});
	});

});