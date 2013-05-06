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
factory('WebappFacebook', function($resource) {
    return $resource('http://graph.facebook.com/:id?callback=?', {id:'@id'}, {
        get: {
            method: 'GET'
        }
    });
});