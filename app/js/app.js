'use strict';


// Declare app level module which depends on filters, and services
angular.module('alveolus', ['alveolus.filters', 'alveolus.services', 'alveolus.directives', 'alveolus.homeCtrl', 'alveolus.webAppDescCtrl']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('', {templateUrl: 'partials/home.html',   controller: 'HomeCtrl'}).
      when('/webapp/:webAppId', {templateUrl: 'partials/webAppDesc.html',   controller: 'WebAppDescCtrl'}).
      when('/webappModal/:webAppId', {templateUrl: 'partials/webAppModal.html',   controller: 'WebAppDescCtrl'}).
      otherwise({redirectTo: ''});
  }]);

