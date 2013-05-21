'use strict';

/* Services Comments */

angular.module('alveolus.commentService', ['ngResource']).
factory('CommentService', function($http,$resource) {

    var url = 'http://quiet-spire-4994.herokuapp.com';

    var service = $resource(url+'/webapps/:id/comments', {catId:'@id'}, {});

    service.addComment = function(params, callback){
        $http({method:'POST', url: url+'/webapps/'+params.webappId+'/comments', cache: true, 
        	params : {'comment' : params.comment, 'rating' : params.rating}}).
        success(function(data){callback(data);});
    }

    service.updateComment = function(params, callback){
        $http({method:'PUT', url: url+'/comments/'+params.commentId, cache: true, 
        	params : {'comment' : params.comment, 'rating' : params.rating}}).
        success(function(data){callback(data);});
    }

    return service;
});