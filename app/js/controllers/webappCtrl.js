'use strict';

/* Controleur de la home page */

angular.module('alveolus.webappCtrl', []).
controller('WebappCtrl', function($scope,$location,$routeParams, WebappService, SocialService, UserService, CommentService, CategoryService) {

	var alertNewComment = {type : 'success', msg : 'Merci d\'avoir commenté cette alvéole ! '};
	var alertSubmitComment = {type : 'info', msg : 'Votre commentaire a bien été modifié.'};
	var alertDeleteComment = {type : 'info', msg : 'Votre commentaire a bien été supprimé.'};
	var alertSubmitTag = {type : 'success', msg : "Votre tag a bien été soumis. Il sera visible si d'autres personnes l'ajoutent aussi."};
	var alertErrorAlreadyTagged = {type : 'error', msg : "Vous avez déjà proposé ce tag pour cette alvéole ! Votre tag n'a pas été ajouté."};
	var alertWebappBookmarked = {type : 'success', msg : "Cette alvéole a bien été ajoutée à vos favoris."};
	var alertWebappUnbookmarked = {type : 'info', msg : "Cette alvéole a bien été supprimée de vos favoris."};
	var alertPostedOnFacebook = {type : 'success', msg : "Merci d\'avoir partagé cette alvéole sur Facebook !"};

	$scope.scrollbar = function(){
		setTimeout(function(){
			$(".nano").nanoScroller({ flash: true });
		},1000);
	};

	$scope.canEdit = false;

	$scope.webAppId=$routeParams.webAppId;
	$scope.webapp=WebappService.get({id: $routeParams.webAppId}, function(data){

		if(!$scope.webapp.validate){
			$location.path('/');
		}

		if($.isEmptyObject(data.comments)){
			$scope.webappHaveComments=false;
		}
		else{
			$scope.webappHaveComments=true;
		}

		if($scope.user.id){
			//user connecté
			UserService.alreadyCommented({webAppId : $scope.webAppId, userId : $scope.user.id}, function(data){
				if($.isEmptyObject(data)){
					$scope.canComment=true;
				}
				else{
					$scope.canComment=false;
					$scope.commentUser=data;
					if($scope.webapp.comments.length==1)
						$scope.webappHaveComments=false;
				}
				$scope.scrollbar();
			});
			if($scope.user.id == $scope.webapp.user_id || $scope.userInfo.admin == true){
				$scope.canEdit = true;
			}
		}else{
			$scope.canComment=false;
		}

		$scope.$on('onLoggedSuccess', function() {
			if($scope.user.id){
				UserService.alreadyCommented({webAppId : $scope.webAppId, userId : $scope.user.id}, function(data){
					if($.isEmptyObject(data)){
						$scope.canComment=true;
					}
					else{
						$scope.canComment=false;
						$scope.commentUser=data;
					}
					$scope.scrollbar();
				});
			}else{
				$scope.canComment=false;
			}
			$scope.scrollbar();
		});

		if($scope.webapp.facebook_id){
			SocialService.getFacebookData($scope.webapp.facebook_id,function(data){
				if($.isEmptyObject(data.error))
					$scope.facebook=data;
				else $scope.facebook=null;
			});
		} else {
			$scope.facebook=null;
		}
		if($scope.webapp.twitter_id){
			var cb = new Codebird;
			cb.setConsumerKey('f3PTTDXnjhHfT5rq7OPxUQ', '3z20DVbNIIDdMlui7ie4RTQEs7vxcseRviA3OyoL8');
			cb.setToken('1420438962-5WiUKt9qGAnX2NTG7265zp6GmGPYScm0ksm2hwI', '8rJlsVD0eat52xP3SUH72EwSVOaOewm066ugeYwUnqk');
			SocialService.getTwitterData(cb, $scope.webapp.twitter_id, function(data){
				$scope.twitter=data.followers_count;
			});
			
		} else {
			$scope.twitter=null;
		}

		$scope.scrollbar();
	});



$scope.submitComment = function(comment) {
	CommentService.addComment({webappId : $scope.webAppId, comment : comment.body,
		rating : comment.rating}, function(data){
			$scope.commentUser=data;
			$scope.canComment=false;
			$scope.addAlert(alertNewComment);
			$scope.webapp.average_rate=(Number($scope.webapp.average_rate*$scope.webapp.comments.length)+Number(comment.rating))/(Number($scope.webapp.comments.length)+1);
			$scope.webapp.comments[$scope.webapp.comments.length]=data;
		});
};

$scope.submitEditComment=function(comment){
	CommentService.updateComment({commentId : comment.id, comment : comment.body,
		rating : comment.rating}, function(data){
			$scope.commentUser=data;
			$scope.editComment=false;
			$scope.addAlert(alertSubmitComment);
		});
};

$scope.deleteComment=function(comment){
	CommentService.deleteComment({commentId : comment.id}, function(data){
		$scope.canComment=true;
		$scope.commentUser=null;
		$scope.addAlert(alertDeleteComment);
	});
};

$scope.bookmark=function(){
	WebappService.bookmark({id : $scope.webAppId}, function(data){
		$scope.webapp.bookmarked=true;
		$scope.addAlert(alertWebappBookmarked);
	});
};
$scope.unbookmark=function(){
	WebappService.unbookmark({id : $scope.webAppId}, function(data){
		$scope.webapp.bookmarked=false;
		$scope.addAlert(alertWebappUnbookmarked);
	});
};

$scope.trackSharing = function(){
	WebappService.tracker({id : $scope.webAppId, type : 'shared'});
};

$scope.changeView = function(url){
	CategoryService.setIdCatSelected($scope.webapp.category_id);
	$location.path(url);
};

$scope.submitTag = function(newTag) {
    WebappService.addTag({id : $routeParams.webAppId, tagName : newTag.name}, function(data){
        $scope.addAlert(alertSubmitTag);
        $scope.webapp.tags=data;
        $scope.userAddTag=false;
        $scope.newTag.name="";
    }, function(data){
        $scope.addAlert(alertErrorAlreadyTagged);
    });
};

$scope.goToEditWebappPage = function(){
	if($scope.isLogged){
		$location.path('/alveoles/'+$routeParams.id+'/edit');
	} else {
		$scope.openModalLogin();
	}
};

});
