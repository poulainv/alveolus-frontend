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
}).
factory('WebappFacebook', function($http) {
   return { get : function(id,callback){
    $http({method: 'JSONP', url: 'http://graph.facebook.com/'+id+'?fields=link,likes&callback=JSON_CALLBACK'}
        ).
    success(function(data, status, headers, config) {
        callback(data)
    }).
    error(function(data, status, headers, config) {
        console.log("error"+data);
    });
}} 
}).
// Attention, Twitter limite les requêtes à 150/h ...
factory('WebappTwitter', function($http) {
   return { get : function(id,callback){
    $http({method: 'JSONP', url: 'http://api.twitter.com/1/users/show.json?screen_name='+id+'&callback=JSON_CALLBACK'}
        ).
    success(function(data, status, headers, config) {
        callback(data)
    }).
    error(function(data, status, headers, config) {
        console.log("error"+data);
    });
}} 
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
});
