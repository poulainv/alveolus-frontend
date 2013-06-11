'use strict';

/* Services Users */

angular.module('alveolus.userService', ['ngResource']).
factory('UserService', function($http,$resource,globals, SessionService) {

    var service = $resource(globals.server_url+'/users/:id', {id:'@id'}, {});

    service.getComments = function(params,callback){
        $http({method:'GET', url: globals.server_url+'/users/'+params.id+'/comments', cache:true}).
        success(function(data){callback(data);});
    };

    service.alreadyCommented = function(params,callback){
        $http({method:'GET', url: globals.server_url+'/users/'+params.userId+'/webapps/'+params.webAppId+'/comments', cache:true}).
        success(function(data){callback(data);});
    };

    service.register = function(user,success,error){
        $http.post(globals.server_url+'/registration', {'user':user})
        .success(function(data, status, headers, config) {
            success(data);
        }).error(function(data, status, headers, config) {
            error(data);
        });
    };

    service.updateUser = function(params,callback){
        $http({method:'PUT', url: globals.server_url+'/users/'+params.userId, cache:true,
            data : {'user' : {'pseudo' : params.user.pseudo}}}).
        success(function(data){callback(data);});
    }

    service.updatePassword = function(params,success,error){
        $http({method:'PUT', url: globals.server_url+'/users/'+params.userId+'/update_password', cache:true,
            data : {'user' : params.user}})
        .success(function(data, status, headers, config) {
            console.log("success");
            success(data);
        }).error(function(data, status, headers, config) {
            console.log("error");
            error(data);
        });
    }

     service.updateAvatar = function(xhr,fd,id){
        
        xhr.open("PUT", globals.server_url+"/users/"+id);
        console.log("session token : "+ SessionService.getToken())
        xhr.setRequestHeader('X-AUTH-TOKEN', SessionService.getToken());
        console.log(xhr);
        xhr.send(fd)
    }

    return service;
});