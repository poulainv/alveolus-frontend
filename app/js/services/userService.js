'use strict';

/* Services Users */

angular.module('alveolus.userService', ['ngResource']).
factory('UserService', function($http,$resource) {

    var url = 'http://quiet-spire-4994.herokuapp.com';

    //Si erreur du style 'ressource n'a pas de methode push', il faut ajouter isarray : true sur le get ou query (voir autres services)
    var service = $resource(url+'/users/:id', {catId:'@id'}, {});

    return service;
});