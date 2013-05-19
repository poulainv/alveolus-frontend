'use strict';

/* Services Session */


angular.module('alveolus.sessionService', ['ngResource']).factory('SessionService', function($log, $resource, $http, $rootScope) {


    var authorized, getUser, getToken, sign_in, sign_out, service, user, token ;
    var url = 'http://quiet-spire-4994.herokuapp.com';
    service = {};
    user = {}; 

    /**
    BROADCAST METHODS
    **/

    function broadcastLogged(){
        $rootScope.$broadcast('onLoggedSuccess');
    };

    /**
      PRIVATE METHODS TO SEND HTTP REQUEST FOR SIGNIN AND SIGNOUT
    **/   
    service.sign_in = function(data,callback){
        $http({
          method:'POST', 
          url: url+'/users/sign_in.json',
          data: data,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
          console.log("User logged");
          console.log(data);
          console.log(data.auth_token);
          user = data ;
          $http.defaults.headers.common['X-AUTH-TOKEN'] = data.auth_token;
          user.authorized = true;
          callback(user);})
        .error(function(data) {
          console.log("User not logged");
          user = data ;
          user.authorized = false;
          callback(user);
        });
    };

    service.sign_out = function(callback){
        $http({
          method:'DELETE', 
          url: url+'/users/sign_out.json',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
          console.log("User unlogged");
          user = {} ;
          user.authorized = false;
          callback(user);})
        .error(function(data) {
          console.log("Error sign_out");
          user = {} ;
          user.authorized = false;
          callback(user);
        });
    };

    
    /*
    PUBLIC METHODS
    */
    authorized = function() {
      return user.authorized === "true";
    };

    sign_in = function(newUser, resultHandler, errorHandler) {
     var xsrf = $.param({
      remote: true,
      commit: "Sign in",
      utf8: "✓", 
      remember_me: 0,
      password: newUser.password, 
      email: newUser.email
    });
      // var data = { password : newUser.password, email : newUser.email};
      return service.sign_in(xsrf,function(result) {
        if (angular.isFunction(resultHandler)) {
          return resultHandler(result);
        }
      }, function(error) {
        if (angular.isFunction(errorHandler)) {
          return errorHandler(error);
        }
      });
    };


    sign_out = function(resultHandler, errorHandler) {
      return service.sign_out(function(result) {
        user = {};
        user.authorized = false;
        if (angular.isFunction(resultHandler)) {
          return resultHandler(result);
        }
      }, function(error) {
        if (angular.isFunction(errorHandler)) {
          return errorHandler(error);
        }
      });
    };

    getToken = function(){
      console.log("return token : "+token);
      return token;
    };

    getUser = function() {
      return user;
    };




    return {
      getToken : getToken,
      sign_in: sign_in,
      sign_out: sign_out,
      authorized: authorized,
      getUser: getUser
    };
  }
);
