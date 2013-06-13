'use strict';

/* Services Tags */

angular.module('alveolus.tagService', ['ngResource']).
factory('TagService', function($http,$resource,globals) {

    var service = $resource(globals.server_url+'/tags/:id', {id:'@id'}, {});
    
    service.getTagsWithAllWebapps = function(callback){
       $http({method:'GET', url: globals.server_url+'/tags_with_webapp', cache: true}).
        success(function(data){callback(data)});
    }

    return service;
});