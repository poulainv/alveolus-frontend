'use strict';

/* Controleur de la home page */

angular.module('alveolus.addUserCtrl', []).
controller('AddUserCtrl', function($scope,$routeParams,UserService) {
    $scope.user={};
    $scope.pseudoMinLenght = 8;
    $scope.generatePseudo = function(){
        //Complète le pseudo si il contient moins de 8 caractères
        if($scope.user.email && !$scope.user.pseudo){
            $scope.user.pseudo = $scope.user.email.split('@')[0];
            var possible = "0123456789";
            console.log($scope.addUserForm.pseudo.error);
            while($scope.user.pseudo.length<8)
                $scope.user.pseudo+=possible.charAt(Math.floor(Math.random() * possible.length));
        }
    };


    $scope.submit=function(){
        UserService.register($scope.user,
            function(data){
                console.log(data);
            });
    };
}).
directive('sameAs', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        console.log(scope['user.password']);
        if (viewValue === scope[attrs.sameAs]) {
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