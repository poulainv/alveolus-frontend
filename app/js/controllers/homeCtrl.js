'use strict';

/* Controleur de la home page */

angular.module('alveolus.homeCtrl', []).
controller('HomeCtrl', function($scope,$location,CategoryService,WebappService) {

	$scope.webapps = WebappService.query(function(){
		$scope.numColumns = 4;
		$scope.rows = [];
		$scope.cols = [];

		$scope.$watch("webapps.length", function(){
			$scope.rows.length = Math.ceil($scope.webapps.length / $scope.numColumns);
			$scope.cols.length = $scope.numColumns;        
		});
	});

	$scope.isCollapsed = false;
		console.log('ok?');
	$scope.categories = CategoryService.getCategories(function(){
		console.log('ok!');
		$scope.catSelected = $scope.categories[0];
		$scope.descCatSelected =  $scope.categories[0].description;
		$scope.appFeatured = WebappService.getFeaturedApp({catId:$scope.catSelected.id});
	});

	$scope.changeCat = function(cat){
		$scope.isCollapsed = true;
		$scope.catSelected = cat;
		$scope.appFeatured = WebappService.getFeaturedApp({catId:cat.id}, function(){
			$scope.isCollapsed = false;			
		});	
	}

	$scope.itemClass = function(cat) {
		// return cat.id === $scope.catSelected.id ? 'catSelected' : undefined;
	};

	$scope.changeView = function(url){
		console.log(url);
		$location.path(url);
	}

	$scope.changeDesc = function(catSelected){
		$scope.descCatSelected = catSelected;
	}

});