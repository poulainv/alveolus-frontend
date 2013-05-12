'use strict';

/* Controleur de la home page */

angular.module('alveolus.webAppDescCtrl', []).
controller('WebAppDescCtrl', function($scope, $routeParams, Webapp, WebappFacebook, User, Categorie, WebappComments, WebappTwitter) {

	$scope.webAppId=$routeParams.webAppId;
	$scope.webapp=Webapp.get({id: $routeParams.webAppId}, function(){
		$scope.user=$scope.webapp.user_id ? User.get({id: $scope.webapp.user_id}) : {'pseudo':'l\'équipe'};
	    $scope.category=Categorie.get({id: $scope.webapp.category_id});

	    $scope.webapp.facebook_id="294735233916083"; // à remplacer quand données complètes
		WebappFacebook.get($scope.webapp.facebook_id,function(data){$scope.facebook=data}); 

		$scope.webapp.twitter_id="Cupofteach"; // à remplacer aussi
		WebappTwitter.get($scope.webapp.twitter_id,function(data){$scope.twitter=data});
		
	});



	$('#webappModal').modal({
        backdrop: true,
        keyboard: true,
        show: false // true pour montrer la modale
    }).css({
       'width': function () { 
           return ($(document).width() * .9) + 'px';  
       },
       'margin-left': function () { 
           return -($(this).width() / 2); 
       }
});


	$scope.save = function() {
	    $scope.comment = angular.copy($scope.comment, $scope.master);
	    alert($scope.comment.rating);
  };

});