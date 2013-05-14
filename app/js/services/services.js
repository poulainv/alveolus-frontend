'use strict';

/* Services */

//*******************************************************
//DEPRECATED - NE PAS UTILISER LES SERVICES DE CE FICHIER
//*******************************************************

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
factory('FeaturedApps', function($resource){
    return $resource('http://quiet-spire-4994.herokuapp.com/categories/:id/featured_webapps', {id:'@id'}, {
        get: {
            method :'GET',
            isArray: true
        }
    });
}).
factory('TrendApps', function($http) {


 return { 
    getMostRecent : function(callback){
        $http({method:'GET', url: 'http://quiet-spire-4994.herokuapp.com/webapps/trend/recent'}).
        success(function(data){callback(data);});
    },
    getMostShared : function(callbackFunction){
        $http({method:'GET', url: 'http://quiet-spire-4994.herokuapp.com/webapps/trend/shared'}).
        success(
            function(data,status,headers,config){
                callback(data);
            }).
        error(
            function(data,status,headers,config){
                console.log("error"+data);
            });
    },
    getBest : function(callback){
        $http({method:'GET', url: 'http://quiet-spire-4994.herokuapp.com/webapps/trend/rated'}).
        success(
            function(data,status,headers,config){
                callback(data);
            }).
        error(
            function(data,status,headers,config){
                console.log("error"+data);
            });
    },
    getMostCommented : function(callback){
        $http({method:'GET', url: 'http://quiet-spire-4994.herokuapp.com/webapps/trend/commented'}).
        success(
            function(data,status,headers,config){
                callback(data);
            }).
        error(
            function(data,status,headers,config){
                console.log("error"+data);
            });
    }} 
}).
factory('Categories', function($resource){
    var data;
    var resource = $resource('http://quiet-spire-4994.herokuapp.com/categories');

    var categories = function(callback) {
        data = resource.query(callback);
        return data;
    }

    return {
        getCategories: function(callback) {
            if(data) {
                return data;
            } else {
                return categories(callback); 
            }

        }
    };
}).
factory('WebappCategories', function($resource){
    return $resource('http://quiet-spire-4994.herokuapp.com/categories/:id/webapps', {id:'@id'}, {
        get: {
            method :'GET'
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
