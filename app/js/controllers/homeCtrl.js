'use strict';

/* Controleur de la home page */

angular.module('alveolus.homeCtrl', []).
controller('HomeCtrl', function($scope,$location,CategoryService,WebappService,SessionService, UserService) {
	$scope.webapps = WebappService.query(function(data){
		/**
		 * Get the 12 last apps validated
		 * and create a slide table.
		 * Each slide has 4 webapp table in it.
		 */
         var validatedAlveoles = [];
         var j=0;
         for(var i=0; i<data.length;i++){
             if(data[i].validate)
                 validatedAlveoles[j++] = data[i];
         }
         var lastAlveoles = validatedAlveoles.sort(function(a,b){
             var dateA = new Date(a.created_at);
             var dateB = new Date(b.created_at);
             if(dateA < dateB)
                 return 1;
             else if (dateA == dateB)
                 return 0;
             else if(dateA > dateB)
                 return -1;
         });
         var slideNumber = 0;
         $scope.slides = [];
         for(i=0; i<12&&i<lastAlveoles.length;i++){
             if(i%4===0)
                 $scope.slides[slideNumber] = [];
             $scope.slides[slideNumber][i%4] = lastAlveoles[i];
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
		if(joyride_validator['categories'] && joyride_validator['carousel'] && !$scope.ridden){
            $('#joyRideTipContent').joyride('init');
            $scope.ridden = true;
		}

	};

});