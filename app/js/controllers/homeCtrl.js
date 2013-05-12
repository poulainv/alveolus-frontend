'use strict';

/* Controleur de la home page */

angular.module('alveolus.homeCtrl', []).
controller('HomeCtrl', function($scope,$location,WebappsList,FeaturedApp,Categories) {

	$scope.webapps = WebappsList.query(function(){
		$scope.numColumns = 4;
		$scope.rows = [];
		$scope.cols = [];

		$scope.$watch("webapps.length", function(){
			$scope.rows.length = Math.ceil($scope.webapps.length / $scope.numColumns);
			$scope.cols.length = $scope.numColumns;        
		});
	});

	$scope.isCollapsed = false;
	$scope.categories = Categories.query();

	$scope.catSelected = {"name":"Crowdfunding","id":"1"};
	$scope.appFeatured = FeaturedApp.get({id:$scope.catSelected.id});

	$scope.changeCat = function(cat){
		$scope.isCollapsed = true;
		$scope.catSelected = cat;
		$scope.appFeatured = FeaturedApp.get({id:cat.id}, function(){
			$scope.isCollapsed = false;			
		});	
	}

	$scope.itemClass = function(cat) {
		return cat.id === $scope.catSelected.id ? 'catSelected' : undefined;
	};

	$scope.changeView = function(url){
		console.log(url);
		$location.path(url);
	}

});