'use strict';

/* Controleur de la home page */

angular.module('alveolus.webappCtrl', []).
controller('WebappCtrl', function($scope,$location,$routeParams, WebappService, SocialService, UserService, CommentService, CategoryService) {

	var alertNewComment = {type : 'success', msg : 'Merci d\'avoir commenté cette alvéole ! '};
	var alertSubmitComment = {type : 'info', msg : 'Votre commentaire a bien été modifié.'};
	var alertDeleteComment = {type : 'info', msg : 'Votre commentaire a bien été supprimé.'};

	$scope.webAppId=$routeParams.webAppId;
	$scope.webapp=WebappService.get({id: $routeParams.webAppId}, function(){
		$scope.webapp.user_id=2;

		if($scope.user.id)
			UserService.alreadyCommented({webAppId : $scope.webAppId, userId : $scope.user.id}, function(data){
				if($.isEmptyObject(data)){
					$scope.canComment=true;
				}
				else{
					$scope.canComment=false;
					$scope.commentUser=data;
					// $scope.hadAlreadyCommented=data;
				}
				
			});
		else{
			$scope.canComment=false;
		}

		$scope.$on('onLoggedSuccess', function() {
			if($scope.user.id)
				UserService.alreadyCommented({webAppId : $scope.webAppId, userId : $scope.user.id}, function(data){
					if($.isEmptyObject(data)){
						$scope.canComment=true;
					}
					else{
						$scope.canComment=false;
						$scope.commentUser=data;
					}
				});
			else{
				$scope.canComment=false;
			}
		});

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
	    		$scope.commentUser=data;
	    		$scope.canComment=false;
	    		$scope.addAlert(alertNewComment);
	    });
  	};

  	$scope.submitEditComment=function(comment){
  		CommentService.updateComment({commentId : comment.id, comment : comment.body, 
	    	rating : comment.rating}, function(data){
	    		$scope.commentUser=data;
	    		$scope.editComment=false;
	    		$scope.addAlert(alertSubmitComment);
	    });
  	}

  	$scope.deleteComment=function(comment){
  		CommentService.deleteComment({commentId : comment.id}, function(data){
	    		$scope.canComment=true;
	    		$scope.commentUser=null;
	    		$scope.addAlert(alertDeleteComment);
	    });
  	}

  	$scope.bookmark=function(){
  		WebappService.bookmark({id : $scope.webAppId}, function(data){
	    		$scope.webapp.bookmarked=true;	    			
	    });
  	}
  	$scope.unbookmark=function(){
  		WebappService.unbookmark({id : $scope.webAppId}, function(data){
	    	$scope.webapp.bookmarked=false;
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