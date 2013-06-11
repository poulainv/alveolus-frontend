'use strict';

/* Controleur de la home page */

angular.module('alveolus.voteCtrl', []).
controller('VoteCtrl', function($scope,$routeParams,WebappService) {
    function loadList(){
        /**
        * Charge la liste des alvéoles non validées
        **/
        WebappService.getUnvalidated(function(data){
            $scope.alveoles = data.sort(function(a,b){
                var dateA = new Date(a.created_at);
                var dateB = new Date(b.created_at);
                if(dateA < dateB)
                    return 1;
                else if (dateA == dateB)
                    return 0;
                else if(dateA > dateB)
                    return -1;
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
                console.log($scope.alveoles[index]);
            });
    };

    $scope.isCollapsed = true;
    $scope.toogleButtonContent = "Afficher la description";
    $scope.$on('onLoggedSuccess', function(){
        loadList();});
    loadList();


});