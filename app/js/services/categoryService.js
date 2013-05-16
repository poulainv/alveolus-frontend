'use strict';

/* Services Categories */

angular.module('alveolus.categoryService', ['ngResource']).
factory('CategoryService', function($http,$resource) {

    var data;
    var idCatSelected;
    var url = 'http://quiet-spire-4994.herokuapp.com';

    var service = $resource(url+'/categories/:id', {catId:'@id'}, {});

    service.getCategoriesWithFeaturedApps = function(callback){
       $http({method:'GET', url: url+'/categories/featured_webapps', cache: true}).
        success(function(data){console.log(data); callback(data);});
    }

    service.setIdCatSelected = function(id){
        idCatSelected = id;
    }

    service.getIdCatSelected = function(){
        return idCatSelected;
    }

    return service;
});