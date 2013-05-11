'use strict';

/* Controleur de la home page */

angular.module('alveolus.homeCtrl', []).
controller('HomeCtrl', function($scope,WebappsList,FeaturedApp,Categories) {

	// $scope.$on('$viewContentLoaded', homeRdy);

	$scope.webapps = WebappsList.query(function(){
		$scope.numColumns = 4;
		$scope.rows = [];
		$scope.cols = [];

		$scope.$watch("webapps.length", function(){
			$scope.rows.length = Math.ceil($scope.webapps.length / $scope.numColumns);
			$scope.cols.length = $scope.numColumns;        
		});
	});

	$scope.categories = Categories.query();

	$scope.catSelected = {"name":"Crowdfunding","id":"1"};
	$scope.appFeatured = FeaturedApp.get({id:$scope.catSelected.id});

	$scope.changeCat = function(cat){
		$scope.catSelected = cat;
		$scope.appFeatured = FeaturedApp.get({id:cat.id});
	};

	$scope.itemClass = function(cat) {
		return cat.id === $scope.catSelected.id ? 'catSelected' : undefined;
	};

});