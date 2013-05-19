'use strict';

/* Controleur de la home page */

angular.module('alveolus.addWebappCtrl', []).
controller('AddWebappCtrl', function($scope,$routeParams,WebappService, SocialService, CategoryService, TagService) {


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
					$('#tagList').append(item);					
				} else {
					$('#tagList').append(', '+item);	
				}
			}
		});
	});

	$scope.submit=function(webapp){
		console.log('submit');
		$scope.webapp = webapp;
		console.log($scope.webapp);
		$scope.webapp.$save();
	};

	$scope.results = function(content, completed) {
		if (completed && content.length > 0){
			console.log(content);
		}
	}


});