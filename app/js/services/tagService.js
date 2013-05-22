'use strict';

/* Services Tags */

angular.module('alveolus.tagService', ['ngResource']).
factory('TagService', function($http,$resource,globals) {

    var service = $resource(globals.server_url+'/tags/:id', {tagId:'@id'}, {});

    return service;
});