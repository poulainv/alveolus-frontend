'use strict';

/* Services Categories */

angular.module('alveolus.categoryService', ['ngResource']).
factory('CategoryService', function($http,$resource) {

    var cat;
    var catWithApps;
    var url = 'http://quiet-spire-4994.herokuapp.com';

    var service = $resource(url+'/categories/:id', {catId:'@id'}, {});
    var serviceWithApps = $resource(url+'/categories/featured_webapps', {});

    var categories = function(callback) {
        cat = service.query(callback);
        return cat;
    }
    
    service.getCategories = function(callback) {
        if(cat) {
            console.log(cat);
            return cat;
        } else {
            return categories(callback); 
        }
    }


    var categoriesWithApps = function(callback){
        catWithApps = serviceWithApps.query(callback);
        return catWithApps
    }

    service.getCategoriesWithFeaturedApps = function(callback){
        if(catWithApps) {
            console.log(catWithApps);
            return catWithApps;
        } else {
            return categoriesWithApps(callback); 
        }
    }

    return service;
});