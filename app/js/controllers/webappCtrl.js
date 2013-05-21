'use strict';

/* Controleur de la home page */

angular.module('alveolus.webappCtrl', []).
controller('WebappCtrl', function($scope,$routeParams, WebappService, SocialService, CommentService, UserService) {

	$scope.webAppId=$routeParams.webAppId;
	$scope.webapp=WebappService.get({id: $routeParams.webAppId}, function(){
		$scope.webapp.user_id=2;
		$scope.userPost=$scope.webapp.user_id ? UserService.get({id: $scope.webapp.user_id}) : {'pseudo':'l\'équipe'};

		// DONNEES EXEMPLES
	    //$scope.webapp.facebook_id="294735233916083";
	    //$scope.webapp.twitter_id="Cupofteach";
	    //$scope.webapp.gplus_id="103505662474284621269";
	    //$scope.webapp.vimeo_id="53270929";

	    if($scope.webapp.facebook_id)
			SocialService.getFacebookData($scope.webapp.facebook_id,function(data){$scope.facebook=data}); 
		else $scope.facebook=null;

		
		if($scope.webapp.twitter_id)
			SocialService.getTwitterData($scope.webapp.twitter_id,function(data){$scope.twitter=data});
		else $scope.twitter=null;

		// A voir récupération données google+ ???
		// if($scope.webapp.gplus_id)
		// 	WebappTwitter.get($scope.webapp.gplus_id,function(data){$scope.twitter=data});
		// else $scope.twitter=null; 
	});

	
//         MODALE 
 //	$('#webappModal').modal({
 //        backdrop: true,
 //        keyboard: true,
 //        show: false // true pour montrer la modale
 //    }).css({
 //       'width': function () { 
 //           return ($(document).width() * .9) + 'px';  
 //       },
 //       'margin-left': function () { 
 //           return -($(this).width() / 2); 
 //       }
// });


	$scope.submitComment = function(comment) {
	    CommentService.addComment({webappId : $scope.webAppId, comment : $scope.comment.body, rating : $scope.comment.rating}, function(data){
	    	alert(data);
	    });
  	};

  	$scope.submitEditComment=function(comment){
  		alert(comment.id);
  	}

  	$scope.submitTag = function(tag) {
	    // CommentService.addComment({webappId : $routeParams.webAppId, comment : $scope.comment}, function(data){
	    // 	alert(data);
	    // });
  	};

  

});