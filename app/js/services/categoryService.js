'use strict';

/* Services Categories */

angular.module('alveolus.categoryService', ['ngResource']).
factory('CategoryService', function($http,$resource,globals) {

    var data;
    var idCatSelected;

    var service = $resource(globals.server_url+'/categories/:id', {catId:'@id'}, {});

    service.getCategoriesWithFeaturedApps = function(callback){
       $http({method:'GET', url: globals.server_url+'/categories/featured_webapps', cache: true}).
        success(function(data){callback(data)});
    }

    service.getCategoriesWithAllWebapps = function(callback){
       $http({method:'GET', url: globals.server_url+'/categories/all', cache: true}).
        success(function(data){callback(data)});
    }

    service.setIdCatSelected = function(id){
        idCatSelected = id;
    }

    service.getIdCatSelected = function(){
        return idCatSelected;
    }

    return service;
});