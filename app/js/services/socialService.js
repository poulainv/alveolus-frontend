'use strict';

/* Services Sociaux */

angular.module('alveolus.socialService', ['ngResource']).
factory('SocialService', function($http,$resource) {

    var service = {};

    service.getFacebookData = function(id,callback){
        $http({method: 'JSONP', url: 'http://graph.facebook.com/'+id+'?fields=link,likes&callback=JSON_CALLBACK', cache: true}).
        success(function(data) {callback(data)});
    }

    service.getTwitterData = function(cb, id,callback){
        cb.__call(
            'users_show',
            'screen_name='+id,
            function (reply) {
                callback(reply);
            },
            true
        );
    }

    return service;
});