'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('alveolus.services', ['ngResource']).
factory('WebappsList', function($resource) {
    return $resource('http://quiet-spire-4994.herokuapp.com/webapps', {}, {
        query: {
            method: 'GET',
            isArray: true
        },
        add: {
            method: 'POST'
        }
    });
}).
factory('Webapp', function($resource) {
    return $resource('http://quiet-spire-4994.herokuapp.com/webapps/:id', {id:'@id'}, {
        get: {
            method: 'GET'
        },
        remove: {
            method: 'DELETE'
        },
        update: {
            method: 'PUT'
        }
    });
}).
factory('FeaturedApp', function($resource){
    return $resource('http://quiet-spire-4994.herokuapp.com/categories/:id/featured_webapp', {id:'@id'}, {
        get: {
            method :'GET'
        }
    });
}).
factory('Categories', function($resource){
    return $resource('http://quiet-spire-4994.herokuapp.com/categories',{},{
        query: {
            method :'GET',
            isArray: true
        }
    });
});