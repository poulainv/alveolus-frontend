'use strict';

/* Services Users */

angular.module('alveolus.userService', ['ngResource']).
factory('UserService', function($http,$resource) {

    var url = 'http://quiet-spire-4994.herokuapp.com';

    var service = $resource(url+'/users/:id', {catId:'@id'}, {});

    return service;
});