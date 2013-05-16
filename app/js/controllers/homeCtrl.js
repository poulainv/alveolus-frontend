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

	$scope.categories = CategoryService.getCategoriesWithFeaturedApps(function(data){
		$scope.catSelected = $scope.categories[Math.floor(Math.random() * $scope.categories.length)];
		$scope.descCatSelected =  $scope.catSelected.description;
		$scope.appFeatured = $scope.catSelected.webapps[Math.floor(Math.random() * $scope.catSelected.webapps.length)];
	});

	//Watcher pour simuler le callback quand celui ci n'est pas appelé
	$scope.$watch('categories',function(newValue){
		if(newValue && newValue.length > 0 ){
			console.log('watcher !');
			$scope.catSelected = $scope.categories[Math.floor(Math.random() * $scope.categories.length)];
			$scope.descCatSelected =  $scope.catSelected.description;
			console.log($scope.catSelected);
			$scope.appFeatured = $scope.catSelected.webapps[Math.floor(Math.random() * $scope.catSelected.webapps.length)];
		}
	});

	$scope.changeCat = function(cat){
		$scope.catSelected = cat;
		$scope.appFeatured = cat.webapps[Math.floor(Math.random() * $scope.catSelected.webapps.length)];
	}

	$scope.itemClass = function(cat) {
		return cat.id === $scope.catSelected.id ? 'catSelected' : undefined;
	};

	$scope.changeView = function(url){
		console.log(url);
		CategoryService.setIdCatSelected($scope.catSelected.id);
		$location.path(url);
	}

	$scope.changeDesc = function(catSelected){
		$scope.descCatSelected = catSelected;
	}

});