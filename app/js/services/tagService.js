'use strict';

/* Services Tags */

angular.module('alveolus.tagService', ['ngResource']).
factory('TagService', function($http,$resource) {

    var url = 'http://quiet-spire-4994.herokuapp.com';

    var service = $resource(url+'/tags/:id', {tagId:'@id'}, {});

    return service;
});