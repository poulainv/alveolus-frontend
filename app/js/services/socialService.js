'use strict';

/* Services Sociaux */

angular.module('alveolus.socialService', ['ngResource']).
factory('SocialService', function($http,$resource) {

    var service = {};

    service.getFacebookData = function(id,callback){
        $http({method: 'JSONP', url: 'http://graph.facebook.com/'+id+'?fields=link,likes&callback=JSON_CALLBACK', cache: true}).
        success(function(data) {callback(data)});
    }

    service.getTwitterData = function(id,callback){
        $http({method: 'JSONP', url: 'http://api.twitter.com/1/users/show.json?screen_name='+id+'&callback=JSON_CALLBACK', cache: true}).
        success(function(data) {callback(data)});
    }

    return service;
});