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

	CategoryService.getFeaturedWebappForEachCategories(function(data){
		$scope.categories = data ;
		$scope.catSelected = $scope.categories[Math.floor(Math.random() * $scope.categories.length)];
		$scope.descCatSelected =  $scope.catSelected.description;
		$scope.appFeatured = $scope.catSelected.webapps[Math.floor(Math.random() * $scope.catSelected.webapps.length)];
	})

	$scope.changeCat = function(cat){
		$scope.catSelected = cat;
		$scope.appFeatured = cat.webapps[Math.floor(Math.random() * $scope.catSelected.webapps.length)];
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