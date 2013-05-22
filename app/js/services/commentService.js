'use strict';

/* Services Comments */

angular.module('alveolus.commentService', ['ngResource']).
factory('CommentService', function($http,$resource,globals) {


    var service = $resource(globals.server_url+'/webapps/:id/comments', {catId:'@id'}, {});

    service.addComment = function(params, callback){
        $http({method:'POST', url: globals.server_url+'/webapps/'+params.webappId+'/comments', cache: true, 
        	params : {'comment' : params.comment, 'rating' : params.rating}}).
        success(function(data){callback(data);});
    }

    return service;
});