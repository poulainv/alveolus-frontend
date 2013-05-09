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
}).
factory('WebappComments', function($resource) {
    return $resource('http://quiet-spire-4994.herokuapp.com/webapps/:id/comments', {id:'@id'}, {
        get: {
            method:'GET', isArray: true
        },
        add: {
            method: 'POST'
        }
    });
}).

factory('UsersList', function($resource) {
    return $resource('http://quiet-spire-4994.herokuapp.com/users', {}, {
        get: {
            method: 'GET'
        },
        add: {
            method: 'POST'
        }
    });
}).
factory('User', function($resource) {
    return $resource('http://quiet-spire-4994.herokuapp.com/users/:id', {id:'@id'}, {
        get: {
            method: 'GET'
        },
        add: {
            method: 'POST'
        },
        remove: {
            method: 'DELETE'
        },
        update: {
            method: 'PUT'
        }
    });
}).
factory('Categorie', function($resource) {
    return $resource('http://quiet-spire-4994.herokuapp.com/categories/:id', {id:'@id'}, {
        get: {
            method: 'GET'
        }
    });
});