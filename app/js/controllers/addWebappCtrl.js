'use strict';

/* Controleur de la home page */

angular.module('alveolus.addWebappCtrl', []).
controller('AddWebappCtrl', function($scope,$routeParams,$location,$window,WebappService, SocialService, CategoryService, TagService) {

	if(!$scope.isLogged){
		$location.path('/');
	}

	$('body').css('background-color','#eef2ea');

	var nbTags = 0;

	$scope.webapp=WebappService.new(function(){
		$scope.webapp.tag_list = '';
	});

	$scope.categories=CategoryService.query();

	$scope.tags=TagService.query(function(){

		var tagNames = [];
		for(var i in $scope.tags){
			tagNames.push($scope.tags[i].name);
		}

		$('#tags').typeahead({

			source: tagNames,

			updater:function (item) {
				$scope.webapp.tag_list += item+', ';
				if($('#tagList').text().length == 0){
					var appendMe = "<span id=\"tag"+nbTags+"\">"+item+"</span>";		
				} else {
					var appendMe = "<span id=\"tag"+nbTags+"\">,"+item+"</span>";
				}
				$('#tagList').append(appendMe);	
				nbTags++;
			}
		});
	});

	$scope.submit=function(webapp){
		console.log('submit');
		$scope.webapp = webapp;
		console.log($scope.webapp);
		WebappService.addWebapp(webapp,$scope.files);
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


});