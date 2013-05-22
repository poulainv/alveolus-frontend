'use strict';

/* Controleur de la home page */

angular.module('alveolus.mainCtrl', []).
controller('MainCtrl', function($scope,$routeParams,$location,WebappService,SessionService,TagService,FeedbackService) {

	var alertLogSuccess = { type: 'success', msg: 'Parfait, vous êtes correctement authentifié' } ;
	var alertLogFail = { type: 'error', msg: 'Oops, impossible de vous authentifier' } ;
	var alertUnauthorized = { type: 'error', msg: 'Vous devez être authentifié' } ;
	var alertUnlogSuccess = { type: 'info', msg: 'A bientôt ! Vous vous êtes correctement déconnecté' } ;

// $.ajax({
//   type: "GET",
//   url: "http://localhost:3000/users/1",
//   headers : { 'X-AUTH-TOKEN' : '71yrbjehDJJqyLhVE6eS'}
// }).done(function( msg ) {
//   alert( "Data Saved: " + msg );
// });
	
	$scope.user = SessionService.getUser();
    $scope.isLogged = SessionService.authorized();

	// To receive broadcasts
	 $scope.$on('onLoggedSuccess', function() {
	 	console.log("catch onLoggedSuccess");
        $scope.user = SessionService.getUser();
        $scope.isLogged = SessionService.authorized();
        $scope.isLogged ? addAlert(alertLogSuccess)  : addAlert(alertLogFail);
		$scope.closeModalLogin();
    });

	  $scope.$on('onUnloggedSuccess', function() {
	 	console.log("catch onUnLoggedSuccess");
        $scope.user = SessionService.getUser();
        $scope.isLogged = SessionService.authorized();
        $scope.isLogged ? addAlert(alertLogFail)  : addAlert(alertUnlogSuccess);
    });

	
	$scope.search = function(content){
		$location.path('/alveoles/search/'+content);
	};

	$scope.logOrUnlog = function(user){
		$scope.isLogged && "Bonjour" || "Connexion"
	}

	// Call SessionService to sin in user with email and password given in modal
	// Update $scope.user of mainControler
	$scope.sign_in = function(user){
		SessionService.sign_in($scope.user);
	};

	$scope.sign_out = function(){
		SessionService.sign_out();
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
		$('#modalLogin').modal('show');
	};


	$scope.closeModalLogin = function () {
		console.log("close mocal lodal");
		$('#modalLogin').modal('hide');
	};

	$scope.openModalFeedback = function () {
		$('#modalLogin').modal('show');
	};

	$scope.closeModalFeedback = function () {
		$('#modalLogin').modal('hide');
		$scope.feedback = {};
	};

	$scope.sendFeedback = function (content) {
		$scope.closeModalFeedback();
		FeedbackService.sendFeedback(content,function(data){
			console.log(data);
		});
	}


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