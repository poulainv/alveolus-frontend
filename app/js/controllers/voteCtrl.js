'use strict';

/* Controleur de la home page */

angular.module('alveolus.voteCtrl', []).
controller('VoteCtrl', function($scope,$routeParams,WebappService,UserService) {
    function init(){
        /**
        * Teste si l'utilisateur est loggué et affiche la modale de connexion ou
        * ou la liste des alvéoles non validées en fonction
        **/
        if(!$scope.isLogged)
            $scope.openModalLogin();
        else
            loadList();
    }
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
            for(var alveole_id in $scope.alveoles){
                //Récupère l'utilisateur qui a posté l'alvéole
                // a modifier une fois qu'on aura l'objet User dans Webapp
                $scope.alveoles[alveole_id].user = $scope.alveoles[alveole_id].user_id ?
                                                    UserService.get({id: $scope.alveoles[alveole_id].user_id})
                                                    : {'pseudo':'l\'équipe'};
            }
        });
    }
    $scope.vote = function(webAppId, index, voteValue){
        if($scope.isLogged)
            WebappService.vote({id: webAppId, value: voteValue}, function(data){
                $scope.alveoles[index] = data;
            });
    };

    $scope.isCollapsed = true;
    $scope.toogleButtonContent = "Afficher la description";
    $scope.$on('onLoggedSuccess', function(){
        loadList();});
    init();


});