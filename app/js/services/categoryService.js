'use strict';

/* Services Categories */

angular.module('alveolus.categoryService', ['ngResource']).
factory('CategoryService', function($http,$resource) {

    var data;
    var url = 'http://quiet-spire-4994.herokuapp.com';

    var service = $resource(url+'/categories/:id', {catId:'@id'}, {});

    var categories = function(callback) {
        data = service.query(callback);
        return data;
    }
    
    service.getCategories = function(callback) {
        if(data) {
            console.log(data);
            return data;
        } else {
            return categories(callback); 
        }
    }

    return service;
});