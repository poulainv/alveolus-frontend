'use strict';


// Declare app level module which depends on filters, and services
angular.module('alveolus', ['alveolus.filters', 'alveolus.services', 'alveolus.directives', 'alveolus.homeCtrl']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('', {templateUrl: 'partials/home.html',   controller: 'HomeCtrl'}).
      otherwise({redirectTo: ''});
  }]);

