'use strict';

/* Controleur de la home page */

angular.module('alveolus.homeCtrl', []).
controller('HomeCtrl', function($scope,$location,globals,CategoryService,WebappService,SessionService, UserService) {


	WebappService.getPopular(function(data){

		var slideNumber = 0;
         $scope.slidesPopular = [];
         for(var i=0; i<12&&i<data.length;i++){
             if(i%4===0)
                 $scope.slidesPopular[slideNumber] = [];
             $scope.slidesPopular[slideNumber][i%4] = data[i];
             if(i%4==3)
                 slideNumber++;
         }

	})

	WebappService.getMostRecent(function(data){
         var slideNumber = 0;
         $scope.slidesRecent = [];
         for(var i=0; i<12&&i<data.length;i++){
             if(i%4===0)
                 $scope.slidesRecent[slideNumber] = [];
             $scope.slidesRecent[slideNumber][i%4] = data[i];
             if(i%4==3)
                 slideNumber++;
         }
         joyride_tester('carousel');
		});

	CategoryService.getCategoriesWithFeaturedApps(function(data){
		$scope.categories = data;
		$scope.catSelected = $scope.categories[Math.floor(Math.random() * $scope.categories.length)];
		$scope.descCatSelected =  $scope.catSelected.description;
		$scope.appFeatured = $scope.catSelected.webapps[Math.floor(Math.random() * $scope.catSelected.webapps.length)];
		joyride_tester('categories');
	});

	$scope.changeCat = function(cat){
		$scope.catSelected = cat;
		$scope.appFeatured = cat.webapps[Math.floor(Math.random() * $scope.catSelected.webapps.length)];
	};

	$scope.itemClass = function(cat) {
		return cat.id === $scope.catSelected.id ? 'btnCatFocus' : undefined;
	};

	$scope.changeView = function(url){
		CategoryService.setIdCatSelected($scope.catSelected.id);
		$location.path(url);
	};

	$scope.changeDesc = function(catSelected){
		$scope.descCatSelected = catSelected;
	};

	$scope.search = function(content){
		$location.path('/alveoles/search/'+content);
	};
	var joyride_validator = [];
	var joyride_tester = function(type){
		joyride_validator[type] = true;
		if(joyride_validator['categories'] && joyride_validator['carousel'] && !globals.joyride){
            $('#joyRideTipContent').joyride('init');
            globals.joyride = true;
		}

	};

});