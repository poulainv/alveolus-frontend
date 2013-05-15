'use strict';

/* Services WebApps */

angular.module('alveolus.webappService', ['ngResource']).
factory('WebappService', function($http,$resource) {

    var url = 'http://quiet-spire-4994.herokuapp.com';
    var service = $resource(url+'/webapps/:id', {id:'@id'}, {});
    var serviceFeatApp = $resource(url+'/categories/:catId/featured_webapp', {catId:'@id'}, {});
    var serviceFeatApps = $resource(url+'/categories/:catId/featured_webapps', {catId:'@id'}, {
        get: {
            method: 'GET',
            isArray: true
        }
    });
    var serviceCatApps = $resource(url+'/categories/:id/webapps', {id:'@id'}, {});


    service.getMostRecent = function(callback){
        $http({method:'GET', url: url+'/webapps/trend/recent', cache: true}).
        success(function(data){callback(data);});
    }

    service.getMostShared = function(callback){
        $http({method:'GET', url: url+'/webapps/trend/shared', cache: true}).
        success(function(data){callback(data);});
    }

    service.getMostCommented =  function(callback){
        $http({method:'GET', url: url+'/webapps/trend/commented', cache: true}).
        success(function(data){callback(data);});
    }

    service.getBest = function(callback){
        $http({method:'GET', url: url+'/webapps/trend/rated', cache: true}).
        success(function(data){callback(data);});
    }

    service.getFeaturedApp = function(params,callback){
        return serviceFeatApp.get(params,callback);
    }

    service.getFeaturedApps = function(params,callback){
        return serviceFeatApps.get(params,callback);
    }

    service.getAppsFromCat = function(params,callback){
        return serviceCatApps.get(params,callback);
    }

    return service;
});