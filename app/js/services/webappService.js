'use strict';

/* Services WebApps */

angular.module('alveolus.webappService', ['ngResource']).
factory('WebappService', function($http,$resource, $rootScope, SessionService,globals) {

    var searchContent;
    var service = $resource(globals.server_url+'/webapps/:id', {id:'@id'}, {
        new: {method:'GET', params:{id:'new'}},
        update : {method:'PUT'}
    });


    service.getMostRecent = function(callback){
        $http({method:'GET', url: globals.server_url+'/webapps/trend/recent', cache: true}).
        success(function(data){callback(data);});
    }

    service.getMostShared = function(callback){
        $http({method:'GET', url: globals.server_url+'/webapps/trend/shared', cache: true}).
        success(function(data){callback(data);});
    }

    service.getMostCommented =  function(callback){
        $http({method:'GET', url: globals.server_url+'/webapps/trend/commented', cache: true}).
        success(function(data){callback(data);});
    }

    service.getBest = function(callback){
        $http({method:'GET', url: globals.server_url+'/webapps/trend/rated', cache: true}).
        success(function(data){callback(data);});
    }

    service.getFeaturedApp = function(params,callback){
        $http({method:'GET', url: globals.server_url+'/categories/'+params.catId+'/featured_webapp', cache:true}).
        success(function(data){callback(data);});
    }

    service.getFeaturedApps = function(params,callback){
        $http({method:'GET', url: globals.server_url+'/categories/'+params.catId+'/featured_webapps', cache: true}).
        success(function(data){callback(data);});
    }

    service.getAppsFromCat = function(params,callback){
        $http({method:'GET', url: globals.server_url+'/categories/'+params.catId+'/webapps', cache: true}).
        success(function(data){callback(data);});
    }

    service.getUnvalidated = function(callback){
        $http({method:'GET', url: globals.server_url+'/webapps/trend/unvalidated', cache: true}).
        success(function(data){callback(data);});
    }

    service.search = function(params,callback){
        $http({method:'GET', url: globals.server_url+'/webapps/search/'+params.content, cache: true}).
        success(function(data){callback(data);});        
    }

    service.setSearchContent = function(content){
        searchContent = content;
    }

    service.getSearchContent = function(){
        return searchContent;
    }

    service.vote = function(params,callback){
        $http({method:'POST', url: globals.server_url+'/webapps/'+params.id+'/vote/?type='+params.value}).
        success(function(data){callback(data);});
    };

    service.addWebapp = function(webapp,files){
        var fd = new FormData();
        fd.append("webapp[title]", webapp.title);
        fd.append("webapp[url]", webapp.url);
        fd.append("webapp[caption]", webapp.caption);
        fd.append("webapp[description]", webapp.description);
        fd.append("webapp[category_id]", webapp.category_id);
        if(webapp.tag_list!=null && webapp.tag_list != undefined){
            fd.append("webapp[tag_list]", webapp.tag_list.substr(0,webapp.tag_list.length-2)); // To remove ', ' at the end
        } else {
             fd.append("webapp[tag_list]", "");
        }
        fd.append("webapp[featured]", webapp.featured);
        fd.append("webapp[twitter_id]", webapp.twitter_id);
        fd.append("webapp[facebook_id]", webapp.facebook_id);
        fd.append("webapp[gplus_id]", webapp.gplus_id);
        fd.append("webapp[photo]", files[0]);
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function(){  $rootScope.$broadcast('onSuggestionSaved');}, false);
        xhr.addEventListener("error", function(){alert("Erreur pendant le chargement du fichier")}, false);
        xhr.addEventListener("abort", function(){ alert('Connexion perdue')}, false);
        xhr.open("POST", globals.server_url+"/webapps");
        xhr.setRequestHeader('X-AUTH-TOKEN', SessionService.getToken());
        console.log(xhr);
        xhr.send(fd)
    }

    service.tracker = function(params){
        $http({method:'POST', url: globals.server_url+'/webapps/'+params.id+'/click/'+params.type});
    }


    service.bookmark = function(params,callback){
        $http({method:'POST', url: globals.server_url+'/webapps/'+params.id+'/bookmarks'}).
        success(function(data){callback(data);});        
    }
    service.unbookmark = function(params,callback){
        $http({method:'DELETE', url: globals.server_url+'/webapps/'+params.id+'/bookmarks'}).
        success(function(data){callback(data);});        
    }



     service.updateImage = function(id,files,callback){
        var fd = new FormData();
        fd.append("webapp[photo]", files[0]);
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", callback, false);
        xhr.addEventListener("error", function(){console.log("There was an error attempting to upload the file.");}, false);
        xhr.addEventListener("abort", function(){console.log("The upload has been canceled by the user or the browser dropped the connection.");}, false);
        xhr.open("PUT", globals.server_url+"/webapps/"+id);
        console.log("session token : "+ SessionService.getToken());
        // console.log(globals.server_url+"/webapps/"+id);
        xhr.setRequestHeader('X-AUTH-TOKEN', SessionService.getToken());
        console.log(xhr);
        xhr.send(fd)
    }


    return service;
});