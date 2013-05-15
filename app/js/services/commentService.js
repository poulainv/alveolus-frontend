'use strict';

/* Services Comments */

angular.module('alveolus.commentService', ['ngResource']).
factory('CommentService', function($http,$resource) {

    var url = 'http://quiet-spire-4994.herokuapp.com';

    var service = $resource(url+'/webapps/:id/comments', {catId:'@id'}, {});

    return service;
});