'use strict';

/* Directives */


angular.module('alveolus.directives', []).
directive('facebook', function($http,globals) {
  return {
    restrict: 'A',
    scope: true,
    controller: function($scope, $attrs, SessionService) {
      // Load the SDK Asynchronously
      (function(d){
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
      }(document));

      function login() {
        FB.login(function(response) {
          if (response.authResponse) {
            console.log('FB.login connected');
            fetch();
          } else {
            console.log('FB.login cancelled');
          }
        }, { scope: 'email,read_stream' }
        );
      };

      function fetch() {
        SessionService.fetchFacebook($scope.auth)
      }

      $scope.fetch = function() {
        console.log("fetch function...");
        if ($scope.login_status == 'connected') {
        alert("Merci d'avoir accepté la demande d'autorisation, vous pouvez vous connecter en SSO");
            location.reload();
       } else {
        console.log("login function...");
        login();
      }
    };
  },
  link: function(scope, element, attrs, controller) {
      // Additional JS functions here
      window.fbAsyncInit = function() {
        FB.init({
          appId      : attrs.facebook, // App ID
          channelUrl : '//alveolus.fr/channel.html', // Channel File
          status     : true, // check login status
          cookie     : true, // enable cookies to allow the server to access the session
          xfbml      : true  // parse XFBML
        });

        // Additional init code here
        FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            // connected
            scope.auth = response.authResponse;
          } else if (response.status === 'not_authorized') {
            console.log("Vous devez autorisé Alveolus pour pouvoir vous connecter à partir de Facebook")
          } else {
            console.log("Erreur")
          }
          scope.login_status = response.status;
          scope.$apply();
        });
      }; // end of fbAsyncInit
    }
  }
});

angular.module('alveolus.share', []).
directive('share', function($http,globals,WebappService) {
  return {
    restrict: 'A',
    scope: true,
    controller: function($scope, $attrs, SessionService) {
    $scope.share = function(){
      WebappService.tracker({id:$attrs.id,type:"shared"});
        console.log($attrs.title)
        var img=($attrs.image=="img/missing.png") ? "http://alveolus.fr/app/img/"+$attrs.id+".jpg" : $attrs.image;
        var obj = {
          method: 'feed',
          link: 'http://alveolus.fr/#/alveoles/'+$attrs.id,
          picture: img,
          name: $attrs.title,
          caption: $attrs.caption
        };

        function callback(response) {
          if(response){
            // $scope.addAlert(alertPostedOnFacebook);
          }
        }

        FB.ui(obj, callback);

}
      }

    }
  });
