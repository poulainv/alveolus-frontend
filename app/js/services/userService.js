'use strict';

/* Services Users */

angular.module('alveolus.userService', ['ngResource']).
factory('UserService', function($http,$resource,globals, SessionService) {

    var service = $resource(globals.server_url+'/users/:id', {id:'@id'}, {});

    service.getComments = function(params,callback){
        $http({method:'GET', url: globals.server_url+'/users/'+params.id+'/comments', cache:true}).
        success(function(data){callback(data);});
    }

    service.alreadyCommented = function(params,callback){
        $http({method:'GET', url: globals.server_url+'/users/'+params.userId+'/webapps/'+params.webAppId+'/comments', cache:true}).
        success(function(data){callback(data);});
    }

    service.updateUser = function(params,callback){
        $http({method:'PUT', url: globals.server_url+'/users/'+params.userId, cache:true,
            data : {'user' : {'pseudo' : params.user.pseudo}}}).
        success(function(data){callback(data);});
    }

     service.updateAvatar = function(files,callback){
        var fd = new FormData();
        fd.append("user[avatar]", files[0]);
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", callback, false);
        xhr.addEventListener("error", function(){console.log("There was an error attempting to upload the file.");}, false);
        xhr.addEventListener("abort", function(){console.log("he upload has been canceled by the user or the browser dropped the connection.");}, false);
        xhr.open("PUT", globals.server_url+"/users/1");
        console.log("session token : "+ SessionService.getToken())
        xhr.setRequestHeader('X-AUTH-TOKEN', SessionService.getToken());
        console.log(xhr);
        xhr.send(fd)
    }

    return service;
});