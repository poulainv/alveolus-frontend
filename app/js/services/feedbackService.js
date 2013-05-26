'use strict';

/* Services Tags */

angular.module('alveolus.feedbackService', ['ngResource']).
factory('FeedbackService', function($http,$resource,globals) {


    var service = {};

    service.sendFeedback = function(feedback,callback){
    	console.log(feedback);
        $http({method: 'POST', url: globals.server_url+'/feedback'	, data : feedback}).
        success(function(data) {callback(data)});
    }

    return service;
});