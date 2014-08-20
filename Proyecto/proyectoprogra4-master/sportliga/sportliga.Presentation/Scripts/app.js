﻿'use strict';

// Declares how the application should be bootstrapped. See: http://docs.angularjs.org/guide/module
angular.module('app', ['ui.router', 'app.filters', 'app.services', 'app.directives', 'app.controllers'])

    // Gets executed during the provider registrations and configuration phase. Only providers and constants can be
    // injected here. This is to prevent accidental instantiation of services before they have been fully configured.
    .config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

        // UI States, URL Routing & Mapping. For more info see: https://github.com/angular-ui/ui-router
        // ------------------------------------------------------------------------------------------------------------

        $stateProvider
            .state('home', {    
                url: '/',
                templateUrl: '/views/index',
                controller: 'HomeCtrl'

            })
            .state('about', {
                url: '/about',
                templateUrl: '/views/about',
                controller: 'AboutCtrl'
            })
            .state('login', {
                url: '/login',
                layout: 'basic',
                templateUrl: '/views/login',
                controller: 'LoginCtrl'
            })
            //ESTADO DE REGISTRO
           .state('register', {
               url: '/register',
               layout: 'basic',
               templateUrl: '/views/register',
               controller: 'RegisterCtrl'
           })
              //ESTADO DE RECUPERAR LA CLAVE
           .state('ForgotPassword', {
               url: '/forgot-password',
               layout: 'basic',
               templateUrl: '/views/forgot-password',

               controller: 'ForgotPasswordCtrl'
           })
              //Acceder a mi perfil
           .state('Profile', {
               url: '/profile',
               layout: 'basic',
               templateUrl: '/views/profile',
               controller: 'ProfileCtrl'
           })
              //Acceder a la liga
           .state('League', {
               url: '/league/:id',
               layout: 'basic',
               templateUrl: '/views/league',
               controller: 'LeagueCtrl'
           })

             //Acceder a los detalles de mi equipo
           .state('Team', {
               url: '/team',
               layout: 'basic',
               templateUrl: '/views/team',
               controller: 'TeamCtrl'
           })
             //Acceder a la pag. de cliente
          .state('Cliente', {
               url: '/Cliente',
               layout: 'basic',
               templateUrl: '/views/Cliente',
               controller: 'ClienteCtrl'
          })
            //Accerder a la ligas del Cliente
            .state('CLeague', {
                url: '/CLeague/:id',
                layout: 'basic',
                templateUrl: '/views/CLeague',
                controller: 'CLeagueCtrl'
            })
            //Accerder a los partidos ad
            .state('ADPartidos', {
                url: '/ADPartidos/:id',
                layout: 'basic',
                templateUrl: '/views/ADPartidos',
                controller: 'ADPartidosCtrl'
            })
         .state('otherwise', {
             url: '*path',
             templateUrl: '/views/404',
             controller: 'Error404Ctrl'
         });

        $locationProvider.html5Mode(true);

    }])

    // Gets executed after the injector is created and are used to kickstart the application. Only instances and constants
    // can be injected here. This is to prevent further system configuration during application run time.
    .run(['$templateCache', '$rootScope', '$state', '$stateParams', function ($templateCache, $rootScope, $state, $stateParams) {

        // <ui-view> contains a pre-rendered template for the current view
        // caching it will prevent a round-trip to a server at the first page load
        var view = angular.element('#ui-view');
        $templateCache.put(view.data('tmpl-url'), view.html());

        // Allows to retrieve UI Router state information from inside templates
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {

            // Sets the layout name, which can be used to display different layouts (header, footer etc.)
            // based on which page the user is located
            $rootScope.layout = toState.layout;
        });
    }]);