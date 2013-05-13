'use strict';


// Declare app level module which depends on filters, and services
angular.module('alveolus', ['alveolus.filters', 'alveolus.services', 'alveolus.directives', 'alveolus.homeCtrl', 'alveolus.webAppDescCtrl', 'alveolus.userCtrl', 'alveolus.webAppListCtrl', 'ui.bootstrap']).
config(
  ['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('', {templateUrl: 'partials/home.html',   controller: 'HomeCtrl'}).
    when('/webapp/:webAppId', {templateUrl: 'partials/webAppDesc.html',   controller: 'WebAppDescCtrl'}).
    when('/webappModal/:webAppId', {templateUrl: 'partials/webAppModal.html',   controller: 'WebAppDescCtrl'}).
    when('/alveoles/categorie/:catId', {templateUrl: 'partials/webAppList.html', controller: 'WebAppListCtrl'}).
    when('/alveoles/featured/:selectionId', {templateUrl: 'partials/webAppList.html', controller: 'WebAppListCtrl'}).
    when('/user/:userId', {templateUrl: 'partials/user.html',   controller: 'UserCtrl'}).
    otherwise({redirectTo: ''});
  }]);
