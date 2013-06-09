'use strict';

/* Controleur de la home page */

angular.module('alveolus.mainCtrl', []).
controller('MainCtrl', function($scope,$routeParams,$location,$window,WebappService,SessionService,TagService,FeedbackService,UserService) {

	var alertLogSuccess = { type: 'success', msg: 'Parfait, vous êtes correctement authentifié' } ;
	var alertLogFail = { type: 'error', msg: 'Oops, impossible de vous authentifier' } ;
	var alertWrongPassword = { type: 'error', msg: 'Mauvais mot de passe.' } ;
	var alertNotConfirmed = { type: 'error', msg: 'Vous devez valider votre inscription avec le mail de confirmation.' } ;
	var alertUnLogFail = { type: 'error', msg: 'Oops, erreur dans la déconnexion' } ;
	var alertUnauthorized = { type: 'error', msg: 'Vous devez être authentifié' } ;
	var alertUnlogSuccess = { type: 'info', msg: 'A bientôt ! Vous vous êtes correctement déconnecté' } ;
	var alertSuggestionSaved = { type: 'success', msg: 'Votre proposition a bien été prise en compte' } ;
	var alertFileUpdate = { type: 'success', msg: 'Le fichier a été correctement mis à jour !' } ;

	$scope.user = SessionService.getUser();
	$scope.isLogged = SessionService.authorized();
	$scope.userInfo = $scope.isLogged ? UserService.get({id:$scope.user.id}): null;
		// To receive broadcasts
	$scope.$on('onLoggedSuccess', function() {
		console.log("catch onLoggedSuccess");
		$scope.user = SessionService.getUser();
		$scope.userInfo = UserService.get({id:$scope.user.id});
		$scope.isLogged = SessionService.authorized();
		$scope.isLogged ? addAlert(alertLogSuccess)  : addAlert(alertLogFail);
		$scope.closeModalLogin();
	});

	$scope.$on('onSuggestionSaved', function() {
		console.log("catch onSuggestionSaved");
	 	// $location.path('/');
	 	addAlert(alertSuggestionSaved);
	 });

	$scope.$on('onFileUpdate', function(){
		addAlert(alertFileUpdate);
	});

	 // When 401 response is receive, an interceptor broadcast
	 // onNeedLogin, so we catch it then we open modal login
	 $scope.$on('onNeedLogin', function() {
	 	console.log("catch need login");
	 	SessionService.resetSession();
	 	$scope.openModalLogin();
	 });

	 $scope.$on('onUnloggedSuccess', function() {
	 	console.log("catch onUnLoggedSuccess");
	 	$scope.user = SessionService.getUser();
	 	$scope.userInfo = null ;
	 	$scope.isLogged = SessionService.authorized();
	 	$scope.isLogged ? addAlert(alertUnLogFail)  : addAlert(alertUnlogSuccess);
	 });

	 $scope.$on('onWrongPassword', function(){
	 	console.log('catch onWrongPassword');
	 	SessionService.resetSession();
	 	$scope.addModalAlert(alertWrongPassword);	 
	 	// $scope.closeModalLogin();	
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

	$scope.goToAddWebappPage = function(){
		if($scope.isLogged){
			$location.path('/alveoles/new');
		} else {
			$scope.openModalLogin();
		}
	};

	// Manage main alert on all pages 
	var addAlert = function(alert) {
		$scope.alerts = [];
		$scope.alerts.push(alert);
	};
	$scope.addAlert = addAlert;

	$scope.addModalAlert = function(alert) {
		$scope.modalAlert = [];
		$scope.modalAlert.push(alert);
	}

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};

	$scope.closeModalAlert = function(index) {
		$scope.modalAlert.splice(index, 1);
	};

	// Reset alert when change location
	$scope.$on('$routeChangeSuccess', function(event) {
		$scope.alerts = [];
		// For google analytics
	    $window._gaq.push(['_trackPageview', $location.path()]);
	});


	// Manage open and close of modal login
	$scope.openModalLogin = function () {
		$('#modalLogin').modal('show');
	};


	$scope.closeModalLogin = function () {
		console.log("close mocal lodal");
		$('#modalLogin').modal('hide');
		$scope.closeModalAlert(0);
	};

	$scope.openModalFeedback = function () {
		$('#modalFeedback').modal('show');
	};

	$scope.closeModalFeedback = function () {
		$('#modalFeedback').modal('hide');
		$scope.feedback = {};
	};

	$scope.sendFeedback = function (content) {
		$scope.closeModalFeedback();
		content.page = $location.path() ;
		content.email = $scope.user.email ; 
		console.log("feedback"+content.comment);
		FeedbackService.sendFeedback(content,function(data){
			console.log(data);
		});
	}

	$scope.tags=TagService.query();

});