'use strict';

/* Controleur de la home page */

angular.module('alveolus.addWebappCtrl', []).
controller('AddWebappCtrl', function($scope,$routeParams,$rootScope, $location,WebappService, SocialService, CategoryService, TagService) {

	if(!$scope.isLogged){
		$location.path('/');
		$scope.openModalLogin();
	}
	
	$('#progressBar').hide();

	// $('body').css('background-color','#eef2ea');

	$scope.nbTags = 0;
	$scope.urlOk = true;
	$scope.webapp=WebappService.new();

	$scope.categories=CategoryService.query();

	$scope.tags=TagService.query(function(){

		var tagNames = [];
		for(var i in $scope.tags){
			tagNames.push($scope.tags[i].name);
		}

		$('#tags').typeahead({

			source: tagNames,

			updater:function (item) {
				var appendMe = "<span onClick=\"$(this).remove()\" class=\"tag\" id=\"tag"+$scope.nbTags+"\"> "+item+" </span>";
				$('#tagList').append(appendMe);	
				$scope.$apply($scope.nbTags++);
			}
		});
	});

	$('#url').blur(function(){
		var content = $('#url').val();
		if(content.length>0){
			WebappService.checkUrl(content,function(data){
				$scope.urlOk = true
			}, function(data){
				$scope.urlOk = false;
			});
		}
	});

	$scope.submit=function(webapp){

		console.log('submit');

		$('#progressBar').show();

		// concatenating tags into an array
		var tagList = "";
		for(var i = 0; i<$scope.nbTags;i++){
			if( $("#tag"+i).text().length > 0 ){
				tagList+=($("#tag"+i).text()+",");
			}
		}

		webapp.tag_list = tagList;
		
		$scope.webapp = webapp;
		console.log($scope.webapp);

		var fd = new FormData();
		fd.append("webapp[title]", webapp.title);
		fd.append("webapp[url]", webapp.url);
		fd.append("webapp[caption]", webapp.caption);
		fd.append("webapp[description]", webapp.description);
		fd.append("webapp[category_id]", webapp.category_id);
		if(webapp.tag_list!=null && webapp.tag_list != undefined){
            fd.append("webapp[tag_list]", webapp.tag_list.substr(0,webapp.tag_list.length-2)); // To remove ', ' at the end
        } else {
        	fd.append("webapp[tag_list]", "");
        }
        fd.append("webapp[twitter_id]", webapp.twitter_id);
        fd.append("webapp[facebook_id]", webapp.facebook_id);
        fd.append("webapp[gplus_id]", webapp.gplus_id);
        fd.append("webapp[vimeo_id]", webapp.vimeo_id);
        fd.append("webapp[photo]", $scope.files[0]);
        var xhr = new XMLHttpRequest();
        xhr.upload.onprogress = updateProgress;
        xhr.addEventListener("load", $scope.callbackUpload, false);
        xhr.addEventListener("error", function(){alert("Erreur pendant le chargement du fichier")}, false);
        xhr.addEventListener("abort", function(){ alert('Connexion perdue')}, false);
        WebappService.addWebapp(xhr,fd);
    };

    $scope.results = function(content, completed) {
    	if (completed && content.length > 0){
    		console.log(content);
    	}
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
				$scope.fileReady=true;
			})
		}
	}, false)

	$scope.setFile = function(element){
		$scope.$apply(function(scope) {
			console.log('files:', element.files);
			$scope.files = [];
			$scope.files.push(element.files[0]);
		});
	}

	var updateProgress = function(e){
		console.log('onprogress');
		var progress = $('#progressBar .bar');
		if (e.lengthComputable) 
		{
			var percentComplete = (e.loaded / e.total)*100;  
			progress.css("width",percentComplete+'%');
			progress.text( Math.round(percentComplete)+'%');
		}
	};

	$scope.callbackUpload = function(){
		console.log('upload OK');
		$rootScope.$apply(function(){
			$rootScope.$broadcast('onSuggestionSaved');
			$('#progressBar .bar').css("width",'100%');
			$('#progressBar .bar').text('100%');
			$location.path('/vote');
		});
	}


});