'use strict';


// Declare app level module which depends on filters, and services
angular.module('alveolus',
    ['alveolus.filters',
    'ngCookies',
    'alveolus.webappService',
    'alveolus.categoryService',
    'alveolus.commentService',
    'alveolus.sessionService',
    'alveolus.socialService', 
    'alveolus.feedbackService', 
    'alveolus.userService', 
    'alveolus.tagService', 
    'alveolus.directives', 
     'alveolus.share', 
    'alveolus.homeCtrl', 
    'alveolus.mainCtrl', 
    'alveolus.graphCtrl', 
    'alveolus.webappCtrl', 
    'alveolus.addWebappCtrl',
    'alveolus.editWebappCtrl',
    'alveolus.userCtrl',
    'alveolus.addUserCtrl',
    'alveolus.webAppListCtrl',
    'alveolus.voteCtrl',
    'ui.bootstrap'
    ]).
config(
    ['$routeProvider','$httpProvider', function($routeProvider, $httpProvider, $injector ) {
        $routeProvider.
        when('/user',                       {templateUrl: 'partials/user.html',             controller: 'UserCtrl'}).
        when('',                            {templateUrl: 'partials/home.html',             controller: 'HomeCtrl'}).
        when('/alveoles/new',               {templateUrl: 'partials/addWebapp.html',        controller: 'AddWebappCtrl'}).
        when('/alveoles/search/:content',   {templateUrl: 'partials/webAppList.html',       controller: 'WebAppListCtrl'}).
        when('/alveoles/:webAppId',         {templateUrl: 'partials/webAppDesc.html',       controller: 'WebappCtrl'}).
        when('/alveoles/:webAppId/edit',    {templateUrl: 'partials/editWebapp.html',       controller: 'EditWebappCtrl'}).
        when('/webappModal/:webAppId',      {templateUrl: 'partials/webAppModal.html',      controller: 'WebappCtrl'}).
        when('/alveoles',                   {templateUrl: 'partials/webAppList.html',       controller: 'WebAppListCtrl'}).
        when('/user/:userId',               {templateUrl: 'partials/user.html',             controller: 'UserCtrl'}).
        when('/inscription',                {templateUrl: 'partials/addUser.html',          controller: 'AddUserCtrl'}).
        when('/vote',                       {templateUrl: 'partials/vote.html',             controller: 'VoteCtrl'}).
        when('/about',                       {templateUrl: 'partials/about.html'}).
        when('/team',                       {templateUrl: 'partials/team.html'}).
        when('/graph',                       {templateUrl: 'partials/graphd3.html' ,         controller: 'GraphCtrl' }).
        otherwise({redirectTo: '/',          templateUrl: 'partials/home.html',             controller: 'HomeCtrl'}); 
        var $http;
        var interceptor = ['$location', '$q','$rootScope','$injector', function ($location, $q, $rootScope, $injector ) {
            return function (promise) {
                $('#contentWrapper').hide();
                $('#navbar-avatar-container').css("visibility","hidden");
                $('#loading').show();

                var success = function(response){
                    $http = $http || $injector.get('$http');
                    if($http.pendingRequests.length < 1) {
                        $('#contentWrapper').show();
                        $('#navbar-avatar-container').css("visibility","visible");
                        $('#loading').hide();
                    }
                    return response;
                }

                var error = function (response) {
                    $http = $http || $injector.get('$http');
                    if($http.pendingRequests.length < 1) {
                        $('#contentWrapper').show();
                        $('#navbar-avatar-container').css("visibility","visible");
                        $('#loading').hide();
                    }

                    if(response.status === 401) {
                        if(response.config.url.indexOf("sign_in.json") !== -1){
                        //if wrong id
                        console.log('catch 401 : wrong id/pass - cast broadcastWrongPassword');
                        $rootScope.$broadcast('onWrongPassword');
                    } else {
                        //general case
                        $location.path('/');
                        console.log("catch 401 : cast broadcastNeedLogin, and redirect main page");
                        $rootScope.$broadcast('onNeedLogin');
                    }
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            };

            return promise.then(success, error);
        }
    }]

    $httpProvider.responseInterceptors.push(interceptor);

}]).value('globals',{server_url : 'http://alveolus.fr'});

