'use strict';

/* Controleur de la home page */

angular.module('alveolus.webAppListCtrl', []).
controller('WebAppListCtrl', function($scope,$routeParams,WebappService,CategoryService) {

	// $('#headerCarousel').hide();
	init();

	/**
	* On change de catégorie
	**/
	$scope.changeCat = function(id){

		console.log("changeCat("+id+")");
		console.log($scope.cats);

		$scope.subcats = new Array();
		$scope.pageName=$scope.cats[id-1].name;

		var c = new Object();
		c.name ='Sélection de l\'équipe';
		c.alveoles = $scope.cats[id-1].webapps;
		console.log(c);
		$scope.subcats.push(c);

		WebappService.getAppsFromCat({catId: id}, function(data){
			var c = new Object();
			c.name ='Toutes les alvéoles';
			c.alveoles = data.webapps;
			$scope.subcats.push(c);
		});
	}


	/**
	* On change de feature
	**/
	$scope.changeFeat = function(id){
		console.log("changeFeat("+id+")");
		setSubcats(id);
		switch(id){
			case 1:
			//Sélection de l'équipe
			$scope.pageName = getSelectionName(1);
			for(var i in $scope.cats){
				$scope.subcats[i].alveoles = $scope.cats[i].webapps;
			}
			break;
			case 2:
			//Les plus commentéees
			$scope.pageName = getSelectionName(2);
			WebappService.getMostCommented(function(data){
				$scope.mostCommentedApps = data;
				$scope.subcats[0].alveoles = data;
			})
			break;
			case 3:
			//Les mieux notées
			$scope.pageName = getSelectionName(3);
			WebappService.getBest(function(data){
				$scope.bestApps = data;
				$scope.subcats[0].alveoles = data;
			})
			break;
			case 4:
			//Les plus récentes
			$scope.pageName = getSelectionName(4);
			WebappService.getMostRecent(function(data){
				$scope.mostRecentApps = data;
				$scope.subcats[0].alveoles = data;
			})
			break;
			case 5:
			//Les plus partagées
			$scope.pageName = getSelectionName(5);
			WebappService.getMostShared(function(data){
				$scope.mostSharedApps = data;
				$scope.subcats[0].alveoles = data;
			})
			break;
			default:
			break;
		}
	}

	/**
	* Retourne le nom de la sélection depuis son id dans le json
	**/
	function getSelectionName(id){
		console.log("getSelectionName("+id+")");
		for(var i in $scope.selectionCats){
			if($scope.selectionCats[i].id == id){
				return $scope.selectionCats[i].name;
			}
		}
		return null;
	}

	/**
	* Initialiase les variables au chargement de la page (une seule fois)
	**/
	function init(){

		console.log("init()");
		$scope.subcats = new Array();
		setSelectionCats();
		var idCat = CategoryService.getIdCatSelected();

		// On commence par charger les catégories
		CategoryService.getCategoriesWithFeaturedApps(function(data){
			//Si l'utilisateur arrive sur la page directement depuis l'url, on le met sur les staff picks
			$scope.cats = data;
			if(idCat){
				$scope.changeCat(idCat);				
			} else {
				$scope.changeFeat(1);
			}
		});

	}


	/**
	* On initialise la liste des sélections
	**/
	function setSelectionCats(){
		console.log("setSelectionCats()");
		$scope.selectionCats = [
		{
			'name':'Sélection de l\'équipe',
			'id':1
		},
		{
			'name':'Les plus commentées',
			'id':2
		},
		{
			'name':'Les mieux notées',
			'id':3
		},
		{
			'name':'Les plus récentes',
			'id':4
		},
		{
			'name':'Les plus partagées',
			'id':5
		}
		]
	}


	/**
	* On initialise les sous catégories, soit avec les catégories, soit avec rien
	**/
	function setSubcats(id){
		console.log("setSubcats("+id+")");
		if(id == 1){
			//Cas Staff Picks
			$scope.subcats = [];

			for(var i in $scope.cats){
				var r = new Object();
				r.name = $scope.cats[i].name;
				r.alveoles = null;
				$scope.subcats.push(r);
			}

		} else {
			//Autres cas
			$scope.subcats = [];
			var r = new Object();
			r.name = '';
			r.alveoles = null;
			$scope.subcats.push(r);
		}
	}

});