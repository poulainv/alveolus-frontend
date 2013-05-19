'use strict';

/* Controleur de la home page */

angular.module('alveolus.voteCtrl', []).
controller('VoteCtrl', function($scope,$routeParams,WebappService) {

    $scope.isCollapsed = true;
    $scope.toogleButtonContent = "Afficher la description";
    loadList();
    /**
    * Initialiase les variables au chargement de la page (une seule fois)
    **/
    function loadList(){
        // On commence par charger les catégories
        WebappService.query(function(data){
            //console.log(data);
            $scope.alveoles = data;
            data.sort(function(a, b){
                // Classe le tableau dans l'ordre décroissant en fonction de "created_at"
                return(new Date(b['created_at'])-new Date(a['created_at']));
            });
            for(var a in data){
                //Récupère l'utilisateur qui a posté l'alvéole
                data[a].user = data[a].user_id ? User.get({id: data[a].user_id}) : {'pseudo':'l\'équipe'};
            }
        });
    }

    $scope.vote = function(webAppId,voteValue){
        WebappService.vote({id: webAppId, value: voteValue}, function(data){
            $scope.data = data;
        });
        
    };


});