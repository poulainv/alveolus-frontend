'use strict';


// Declare app level module which depends on filters, and services
angular.module('alveolus',
    ['alveolus.filters',
    'alveolus.webappService',
    'alveolus.categoryService',
    'alveolus.commentService',
    'alveolus.sessionService',
    'alveolus.socialService', 
    'alveolus.feedbackService', 
    'alveolus.userService', 
    'alveolus.tagService', 
    'alveolus.directives', 
    'alveolus.homeCtrl', 
    'alveolus.mainCtrl', 
    'alveolus.webappCtrl', 
    'alveolus.addWebappCtrl',
    'alveolus.userCtrl',
    'alveolus.webAppListCtrl',
    'alveolus.voteCtrl',
    'ui.bootstrap'
    ]).
config(
  ['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('', {templateUrl: 'partials/home.html',   controller: 'HomeCtrl'}).
    when('/alveoles/new', {templateUrl: 'partials/addWebapp.html',   controller: 'AddWebappCtrl'}).
    when('/alveoles/search/:content', {templateUrl: 'partials/webAppList.html',   controller: 'WebAppListCtrl'}).
    when('/alveoles/:webAppId', {templateUrl: 'partials/webAppDesc.html',   controller: 'WebappCtrl'}).
    when('/webappModal/:webAppId', {templateUrl: 'partials/webAppModal.html',   controller: 'WebappCtrl'}).
    when('/alveoles', {templateUrl: 'partials/webAppList.html', controller: 'WebAppListCtrl'}).
    when('/user/:userId', {templateUrl: 'partials/user.html',   controller: 'UserCtrl'}).
    when('/vote', {templateUrl: 'partials/vote.html',   controller: 'VoteCtrl'}).
    otherwise({redirectTo: '/', templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
}],["$httpProvider", function($httpProvider) {
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
}]).value('$anchorScroll', angular.noop);
