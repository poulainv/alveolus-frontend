'use strict';

/* Services Tags */

angular.module('alveolus.feedbackService', ['ngResource']).
factory('FeedbackService', function($http,$resource) {

    var url = 'http://quiet-spire-4994.herokuapp.com';

    var service = {};

    service.sendFeedback = function(content,callback){
        $http({method: 'POST', url: url+'/feedback'}).
        success(function(data) {callback(data)});
    }

    return service;
});