'use strict';

/* Controleur de la home page */

angular.module('alveolus.editWebappCtrl', []).
controller('EditWebappCtrl', function($scope,$routeParams,$location,$rootScope,WebappService,CategoryService) {


	if(!$scope.isLogged){
		$location.path('/');
		$scope.openModalLogin();

	}

	$('#progressBar').hide();
	
	$scope.webapp = WebappService.get({id:$routeParams.webAppId}, function(){
		// If user is not admin AND he's not alveole owner
		if(!($scope.user.id == $scope.webapp.user_id || $scope.userInfo.admin)){
			$location.path('alveoles/'+$routeParams.webAppId);
			$rootScope.$broadcast('onEditAccessFailed');
		}	
	});
	$scope.categories=CategoryService.query();		

	$scope.submit = function(webapp){
		var webappToSend = {
			id : webapp.id,
			title : webapp.title,
			url : webapp.url,
			caption : webapp.caption,
			description : webapp.description,
			category_id : webapp.category_id,
			tag : webapp.tag,
			featured : webapp.featured,
			facebook_id : webapp.facebook_id,
			twitter_id : webapp.twitter_id,
			gplus_id : webapp.gplus_id,
			vimeo_id : webapp.vimeo_id,
		}
		console.log('edit webapp :');
		console.log(webappToSend);
		WebappService.update(webappToSend);
		$location.path('/');

	}


	$scope.updateImage = function(){
		console.log("updateImage");

		$('#progressBar').show();

        var fd = new FormData();
        fd.append("webapp[photo]", $scope.files[0]);
        var xhr = new XMLHttpRequest();
		xhr.upload.onprogress = updateProgress;
        xhr.addEventListener("load", callback, false);
        xhr.addEventListener("error", function(){console.log("There was an error attempting to upload the file.");}, false);
        xhr.addEventListener("abort", function(){console.log("The upload has been canceled by the user or the browser dropped the connection.");}, false);
		WebappService.updateImage($routeParams.webAppId,xhr,fd);
	}

	//Drag'n'drop

	var dropbox = document.getElementById("dropbox");

	function dragEnterLeave(evt) {
		evt.stopPropagation()
		evt.preventDefault()
		$scope.$apply(function(){
			$scope.dropClass = ''
		})
	}
	dropbox.addEventListener("dragenter", dragEnterLeave, false)
	dropbox.addEventListener("dragleave", dragEnterLeave, false)
	dropbox.addEventListener("dragover", function(evt) {
		evt.stopPropagation()
		evt.preventDefault()
		var clazz = 'not-available'
		var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0
		$scope.$apply(function(){
			$scope.dropClass = ok ? 'over' : 'not-available'
		})
	}, false)
	dropbox.addEventListener("drop", function(evt) {
		console.log('drop evt:', JSON.parse(JSON.stringify(evt.dataTransfer)))
		evt.stopPropagation()
		evt.preventDefault()
		$scope.$apply(function(){
		})
		var file = evt.dataTransfer.files
		if (file.length > 0) {
			$scope.$apply(function(){
				$scope.files = []
				$scope.files.push(file[0]);
			})
		}
	}, false)

	$scope.setFile = function(element){
		$scope.$apply(function(scope) {
			console.log('files:', element.files);
			$scope.files = []
			$scope.files.push(element.files[0])
			$scope.progressVisible = false
		});
	}


	var updateProgress = function(e){
		var progress = $('#progressBar .bar');
		if (e.lengthComputable) 
		{
			var percentComplete = (e.loaded / e.total)*100;  
			progress.css("width",percentComplete+'%');
			progress.text( Math.round(percentComplete)+'%');
		}
	};

	var callback = function(evt){
		$scope.webapp = jQuery.parseJSON(evt.target.response);
		$rootScope.$apply($rootScope.$broadcast('onFileUpdate'));
		console.log($scope.webapp);
	};


});