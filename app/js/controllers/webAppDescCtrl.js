'use strict';

/* Controleur de la home page */

angular.module('alveolus.webAppDescCtrl', []).
controller('WebAppDescCtrl', function($scope, $routeParams, Webapp, WebappFacebook, User, Categorie, WebappComments, WebappTwitter) {


	$scope.result=Webapp.get({id: $routeParams.webAppId}, function(){
		$scope.user=$scope.result.webapp.user_id ? User.get({id: $scope.result.webapp.user_id}) : {'pseudo':'l\'équipe'};
	    $scope.category=Categorie.get({id: $scope.result.webapp.category_id});
	    $scope.comments=WebappComments.get({id: $routeParams.webAppId});

	    $scope.result.webapp.facebook_id="294735233916083"; // à remplacer quand données complètes
		WebappFacebook.get($scope.result.webapp.facebook_id,function(data){$scope.facebook=data}); 

		$scope.result.webapp.twitter_id="Cupofteach"; // à remplacer aussi
		WebappTwitter.get($scope.result.webapp.twitter_id,function(data){$scope.twitter=data});
		
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