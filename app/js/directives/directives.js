'use strict';

/* Directives */


angular.module('alveolus.directives', []).
directive('facebook', function($http,globals) {
	return {
		restrict: 'A',
		scope: true,
		controller: function($scope, $attrs) {
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
      	$http.post(globals.server_url+'/facebook/fetch', $scope.auth
      		).success(function(data) {
      			window.location.reload(true);
      			$scope.fetch_status = data.status;
      			console.log("User logged");
      			setUser({id : data.id, email : data.email, success: true });
      			token = data.auth_token;
      			setHttpProviderCommonHeaderToken(token);
      			setSessionToken(token,data.id);
      			broadcastLogged();
      		}).error(function(data) {
      			console.log('error: '+data);
      			$scope.fetch_status = data.status;
      		});
      	}

      	$scope.fetch = function() {
      		if ($scope.login_status == 'connected') {
      			console.log('fetch');
      			fetch();
      		} else {
      			login();
      		}
      	};
      },
      link: function(scope, element, attrs, controller) {
      // Additional JS functions here
      window.fbAsyncInit = function() {
      	FB.init({
          appId      : attrs.facebook, // App ID
          channelUrl : '//localhost:3000/channel.html', // Channel File
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
            // not_authorized
        } else {
            // not_logged_in
        }
        scope.login_status = response.status;
        scope.$apply();
    });
      }; // end of fbAsyncInit
  }
}
});

