'use strict';

/* Controleur de la home page */

angular.module('alveolus.webAppDescCtrl', []).
controller('WebAppDescCtrl', function($scope, $routeParams, Webapp, WebappFacebook, User, Categorie, WebappComments) {

	$scope.result=Webapp.get({id: $routeParams.webAppId});
	// $scope.user=$scope.webapp.user_id ? $scope.webapp.user_id : 'X';
	$scope.facebook_id="294735233916083";
	// $scope.facebook=WebappFacebook.get({id: $scope.facebook_id}); // Requête cross domain ne marche pas

	$scope.user=User.get({id: 1}); // lien avec webapp

	$scope.category=Categorie.get({id: 2}); // $scope.result.webapp.category_id Ne marche pas !!

	$scope.comments=WebappComments.get({id: $routeParams.webAppId}); 

	// $('#webappModal').modal('toggle');

	$('#webappModal').modal({
        backdrop: true,
        keyboard: true,
        show: true
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