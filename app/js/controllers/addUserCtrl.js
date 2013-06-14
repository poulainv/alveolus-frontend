'use strict';

/* Controleur de la home page */

angular.module('alveolus.addUserCtrl', []).
controller('AddUserCtrl', function($scope,$routeParams,$location,UserService) {
  $scope.user={};
  var registerSuccessAlert = { type: 'success', msg: 'Votre inscription a correctement été prise en compte. Un mail vient de vous être envoyé pour confirmer votre adresse.' } ;
  var registerFailAlert = { type: 'error', msg: 'Il y a eu une erreur durant votre inscription, votre email a surement été déjà utilisé !' } ;
  
  $scope.generatePseudo = function(){
    //Complète le pseudo si il contient moins de 8 caractères
    if($scope.user.email && !$scope.user.pseudo){
      $scope.user.pseudo = $scope.user.email.split('@')[0];
      var possible = "0123456789";
      while($scope.user.pseudo.length<8)
        $scope.user.pseudo+=possible.charAt(Math.floor(Math.random() * possible.length));
    }
  };

  $scope.submit=function(){
    UserService.register($scope.user,
      function(data){
      //Success callback
      if(data['success']){
        $scope.addAlert(registerSuccessAlert);
        $location.path('/');
      }else{
        $scope.addAlert(registerFailAlert);
      }
    },
    function(data){
      //Error callback
      $scope.addAlert(registerFailAlert);
    });
  };

  $scope.test=function(){
    console.log('ok');
  };
}).
directive('sameAs', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        var ref = scope;
        var tab = attrs.sameAs.split('.');
        for(var i=0;i<tab.length; i++){
          ref = ref[tab[i]];
        }
        if (viewValue === ref) {
          ctrl.$setValidity('sameAs', true);
          return viewValue;
        } else {
          ctrl.$setValidity('sameAs', false);
          return undefined;
        }
      });
    }
  };
});