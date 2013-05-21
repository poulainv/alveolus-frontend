'use strict';

/* Controleur de la home page */

angular.module('alveolus.voteCtrl', []).
controller('VoteCtrl', function($scope,$routeParams,WebappService) {
    function loadList(){
        /**
        * Charge la liste des alvéoles non validées
        **/
        WebappService.getUnvalidated(function(data){
            $scope.alveoles = data;
            $scope.alveoles.sort(function(a, b){
                // Classe le tableau dans l'ordre décroissant en fonction de "created_at"
                return(new Date(b['created_at'])-new Date(a['created_at']));
            });
        });
    }
    $scope.vote = function(webAppId, index, voteValue){
        /**
        * Prend en compte le vote de l'utilisateur
        * et met à jour le modèle
        **/
        if($scope.isLogged)
            WebappService.vote({id: webAppId, value: voteValue}, function(data){
                $scope.alveoles[index] = data;
            });
    };

    $scope.isCollapsed = true;
    $scope.toogleButtonContent = "Afficher la description";
    $scope.$on('onLoggedSuccess', function(){
        loadList();});
    loadList();


});