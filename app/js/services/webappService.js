'use strict';

/* Services WebApps */

angular.module('alveolus.webappService', ['ngResource']).
factory('WebappService', function($http,$resource,SessionService) {

    var searchContent;
    var url = 'http://quiet-spire-4994.herokuapp.com';
    var service = $resource(url+'/webapps/:id', {id:'@id'}, {
        new: {method:'GET', params:{id:'new'}}
        update : {method:'PUT'}
    });


    service.getMostRecent = function(callback){
        $http({method:'GET', url: url+'/webapps/trend/recent', cache: true}).
        success(function(data){callback(data);});
    }

    service.getMostShared = function(callback){
        $http({method:'GET', url: url+'/webapps/trend/shared', cache: true}).
        success(function(data){callback(data);});
    }

    service.getMostCommented =  function(callback){
        $http({method:'GET', url: url+'/webapps/trend/commented', cache: true}).
        success(function(data){callback(data);});
    }

    service.getBest = function(callback){
        $http({method:'GET', url: url+'/webapps/trend/rated', cache: true}).
        success(function(data){callback(data);});
    }

    service.getFeaturedApp = function(params,callback){
        $http({method:'GET', url: url+'/categories/'+params.catId+'/featured_webapp', cache:true}).
        success(function(data){callback(data);});
    }

    service.getFeaturedApps = function(params,callback){
        $http({method:'GET', url: url+'/categories/'+params.catId+'/featured_webapps', cache: true}).
        success(function(data){callback(data);});
    }

    service.getAppsFromCat = function(params,callback){
        $http({method:'GET', url: url+'/categories/'+params.catId+'/webapps', cache: true}).
        success(function(data){callback(data);});
    }

    service.search = function(params,callback){
        $http({method:'GET', url: url+'/webapps/search/'+params.content, cache: true}).
        success(function(data){callback(data);});        
    }

    service.setSearchContent = function(content){
        searchContent = content;
    }

    service.getSearchContent = function(){
        return searchContent;
    }

    service.vote = function(params,callback){
        $http({method:'POST', url: url+'/webapps/'+params.id+'/vote/?type='+params.value}).
        success(function(data){callback(data);});
    };

    service.addWebapp = function(webapp,files){
        var fd = new FormData();
        fd.append("webapp[title]", webapp.title);
        fd.append("webapp[url]", webapp.url);
        fd.append("webapp[caption]", webapp.caption);
        fd.append("webapp[description]", webapp.description);
        fd.append("webapp[category_id]", webapp.category_id);
        fd.append("webapp[tag_list]", webapp.tag_list);
        fd.append("webapp[featured]", webapp.featured);
        fd.append("webapp[twitter_id]", webapp.twitter_id);
        fd.append("webapp[facebook_id]", webapp.facebook_id);
        fd.append("webapp[gplus_id]", webapp.gplus_id);
        fd.append("webapp[photo]", files[0]);
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", uploadComplete, false);
        xhr.addEventListener("error", uploadFailed, false);
        xhr.addEventListener("abort", uploadCanceled, false);
        xhr.open("POST", url+"/webapps");
        xhr.setRequestHeader('X-AUTH-TOKEN', SessionService.getToken());
        console.log(xhr);
        xhr.send(fd)
    }

    function uploadComplete(evt) {
        /* This event is raised when the server send back a response */
        alert(evt.target.responseText)
    }

    function uploadFailed(evt) {
        alert("There was an error attempting to upload the file.")
    }

    function uploadCanceled(evt) {
        alert("The upload has been canceled by the user or the browser dropped the connection.")
    }


    return service;
});