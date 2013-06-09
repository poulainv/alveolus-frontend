'use strict';

/* Controleur de la user page */

angular.module('alveolus.userCtrl', []).
controller('UserCtrl', function($scope, $routeParams, $location, UserService, SessionService, CategoryService) {

	console.log('isLogged:'+$scope.isLogged+' user.id:'+$scope.user.id);

	if($scope.isLogged){
		$scope.user=UserService.get({id: $scope.user.id});
	}
	else $scope.openModalLogin();

	$('#progressBar').hide();
	
	
	$scope.onSubmit=function(user){
		console.log('$scope.onSubmit');
		UserService.updateUser({userId : user.id, user : user}, function(data){
			$scope.user=data;
			console.log('callback '.data);
		});	
	}

	$scope.updateAvatar = function(){
		console.log("updateAVatar");

		$('#progressBar').show();

		var fd = new FormData();
		fd.append("user[avatar]", $scope.files[0]);
		var xhr = new XMLHttpRequest();
		xhr.upload.onprogress = updateProgress;
		xhr.addEventListener("load", callback, false);
		xhr.addEventListener("error", function(){console.log("There was an error attempting to upload the file.");}, false);
		xhr.addEventListener("abort", function(){console.log("he upload has been canceled by the user or the browser dropped the connection.");}, false);


		UserService.updateAvatar(xhr,fd,$scope.user.id);
	}


	var dropbox = document.getElementById("dropbox");

	function dragEnterLeave(evt) {
		evt.stopPropagation()
		evt.preventDefault()
		$scope.$apply(function(){
			$scope.dropClass = ''
		});
	};

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
	
	$scope.changeView = function(url){
		console.log('changeView ' + url);
		$location.path(url);
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
		$scope.user = jQuery.parseJSON(evt.target.response);
		$rootScope.$broadcast('onFileUpdate');
		console.log($scope.user);
		$scope.image = $scope.user.image_url
	};
});