'use strict';

/* Services Users */

angular.module('alveolus.userService', ['ngResource']).
factory('UserService', function($http,$resource,globals) {

    var service = $resource(globals.server_url+'/users/:id', {id:'@id'}, {});

    service.getComments = function(params,callback){
        $http({method:'GET', url: globals.server_url+'/users/'+params.catId+'/comments', cache:true}).
        success(function(data){callback(data);});
    }

    service.alreadyCommented = function(params,callback){
        $http({method:'GET', url: globals.server_url+'/users/'+params.userId+'/webapps/'+params.webAppId+'/comments', cache:true}).
        success(function(data){callback(data);});
    }

    return service;
});