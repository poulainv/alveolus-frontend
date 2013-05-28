'use strict';

/* Controleur de la home page */

angular.module('alveolus.editWebappCtrl', []).
controller('EditWebappCtrl', function($scope,$routeParams,$location,WebappService,CategoryService) {

	$scope.webapp = WebappService.get({id:$routeParams.webAppId});
	$scope.categories=CategoryService.query();		

	$scope.submit = function(webapp){
		var webappToSend = {
			id : webapp.id,
			title : webapp.title,
			url : webapp.url,
			caption : webapp.caption,
			description : webapp.description,
			category_id : webapp.category_id,
			tag : webapp.tag,
			featured : webapp.featured,
			facebook_id : webapp.facebook_id,
			twitter_id : webapp.twitter_id,
			gplus_id : webapp.gplus_id,
		}
		console.log('edit webapp :');
		console.log(webappToSend);
		WebappService.update(webappToSend);
		$location.path('/');

	}


});