'use strict';

/* Controleur de la home page */

angular.module('alveolus.homeCtrl', []).
controller('HomeCtrl', function($scope,WebappsList) {

	// $scope.$on('$viewContentLoaded', homeRdy);

	$scope.webapps = WebappsList.query();

	$scope.cats = [
	{"name": "Finance"},
	{"name": "Agriculture Biologique"},
	{"name": "Voiture"},
	{"name": "Économie parallèle"},
	{"name": "Troc"},
	{"name": "Travail"},
	{"name": "Partage"},
	{"name": "Voyage"},
	{"name": "E-Learning"}
	];

    $scope.catSelected = $scope.cats[0];

    $scope.hover = function(cat) {
    	console.log(cat+' selected')
       $scope.catHovered = cat; 
    };

    $scope.itemClass = function(cat) {
        return cat === $scope.catHovered ? 'catSelected' : undefined;
    };

});