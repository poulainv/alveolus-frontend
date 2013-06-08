'use strict';

/* Controleur de la home page */

angular.module('alveolus.homeCtrl', []).
controller('HomeCtrl', function($scope,$location,CategoryService,WebappService,SessionService, UserService) {


	$scope.webapps = WebappService.query(function(data){
		$scope.popularAlveoles = data;
		var slideNumber = 0;
		$scope.slides = [];
		for(var i=0; i<$scope.popularAlveoles.length;i++){
			console.log('slideNumber = '+ slideNumber);
			if(i%4===0)
				$scope.slides[slideNumber] = [];
			$scope.slides[slideNumber][i%4] = $scope.popularAlveoles[i];
			if(i%4==3)
				slideNumber++;
		}
		$scope.numColumns = 4;
		$scope.rows = [];
		$scope.cols = [];

		$scope.$watch("webapps.length", function(){
			$scope.rows.length = Math.ceil($scope.webapps.length / $scope.numColumns);
			$scope.cols.length = $scope.numColumns;        
		});
	});

	CategoryService.getCategoriesWithFeaturedApps(function(data){
		$scope.categories = data;
		$scope.catSelected = $scope.categories[Math.floor(Math.random() * $scope.categories.length)];
		$scope.descCatSelected =  $scope.catSelected.description;
		$scope.appFeatured = $scope.catSelected.webapps[Math.floor(Math.random() * $scope.catSelected.webapps.length)];
		// $('#contentWrapper').show();
		// $('#loading').hide();
	});

	$scope.changeCat = function(cat){
		$scope.catSelected = cat;
		$scope.appFeatured = cat.webapps[Math.floor(Math.random() * $scope.catSelected.webapps.length)];
	}

	$scope.itemClass = function(cat) {
		return cat.id === $scope.catSelected.id ? 'btnCatFocus' : undefined;
	};

	$scope.changeView = function(url){
		CategoryService.setIdCatSelected($scope.catSelected.id);
		$location.path(url);
	}

	$scope.changeDesc = function(catSelected){
		$scope.descCatSelected = catSelected;
	}

	$scope.search = function(content){
		$location.path('/alveoles/search/'+content);
	};

});