'use strict';

/* Controleur de la home page */

angular.module('alveolus.webappCtrl', []).
controller('WebappCtrl', function($scope,$location,$routeParams, WebappService, SocialService, CommentService, UserService, CategoryService) {

	$scope.webAppId=$routeParams.webAppId;
	$scope.webapp=WebappService.get({id: $routeParams.webAppId}, function(){
		$scope.webapp.user_id=2;
		$scope.userPost=$scope.webapp.user_id ? UserService.get({id: $scope.webapp.user_id}) : {'pseudo':'l\'équipe'};

		if($scope.user.id)
			UserService.alreadyCommented({webAppId : $scope.webAppId, userId : $scope.user.id}, function(data){
				if($.isEmptyObject(data)) $scope.canComment=true;
				else{
					$scope.canComment=false;
					$scope.hadAlreadyCommented=true;
				}
				
			});
		else $scope.canComment=false;
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
	    CommentService.addComment({webappId : $scope.webAppId, comment : comment.body, 
	    	rating : comment.rating}, function(data){
	    		$scope.webapp.comments=data;
	    		$scope.canComment=false;
	    		$scope.hadCommented=true;
	    		$scope.webapp=WebappService.get({id: $routeParams.webAppId});
	    });
  	};

  	$scope.submitEditComment=function(comment){
  		CommentService.updateComment({commentId : comment.id, comment : comment.body, 
	    	rating : comment.rating}, function(data){
	    		$scope.webapp.comments=data;
	    		$scope.editComment=false;
	    });
  	}

  	$scope.deleteComment=function(comment){
  		CommentService.deleteComment({commentId : comment.id}, function(data){
	    		$scope.webapp.comments=data;
	    		$scope.webapp=WebappService.get({id: $routeParams.webAppId});
	    		$scope.canComment=true;

	    });
  	}

	$scope.changeView = function(url){
		console.log('changeView ' + url);
		CategoryService.setIdCatSelected($scope.webapp.category_id);
		$location.path(url);
	}

  	$scope.submitTag = function(tag) {
	    // CommentService.addComment({webappId : $routeParams.webAppId, comment : $scope.comment}, function(data){
	    // 	alert(data);
	    // });
  	};

  

});