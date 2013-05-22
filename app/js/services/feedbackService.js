'use strict';

/* Services Tags */

angular.module('alveolus.feedbackService', ['ngResource']).
factory('FeedbackService', function($http,$resource,globals) {


    var service = {};

    service.sendFeedback = function(content,callback){
        $http({method: 'POST', url: globals.server_url+'/feedback'}).
        success(function(data) {callback(data)});
    }

    return service;
});