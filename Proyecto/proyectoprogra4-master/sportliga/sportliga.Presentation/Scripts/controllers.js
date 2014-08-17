'use strict';

// Google Analytics Collection APIs Reference:
// https://developers.google.com/analytics/devguides/collection/analyticsjs/

angular.module('app.controllers', [])

    // Path: /
    .controller('HomeCtrl', [
        '$scope', '$location', '$window', function($scope, $location, $window) {
            $scope.$root.title = 'AngularJS SPA Template for Visual Studio';
            $scope.$on('$viewContentLoaded', function() {
                $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
            });
        }
    ])

    // Path: /about
    .controller('AboutCtrl', [
        '$scope', '$location', '$window', function($scope, $location, $window) {
            $scope.$root.title = 'AngularJS SPA | About';
            $scope.$on('$viewContentLoaded', function() {
                $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
            });
        }
    ])

    // Path: /login
    .controller('LoginCtrl', [
        '$scope', '$location', '$window', function($scope, $location, $window) {
            $scope.$root.title = 'AngularJS SPA | Sign In';
            // TODO: Authorize a user

            $scope.login = function() {
                $location.path('/register');
                return true;

            };
            $scope.$on('$viewContentLoaded', function() {
                $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
            });

            $scope.register = function() {
                $location.path('/register');
                return false;
            };
            $scope.Cuentas = function(userName, password) {
                $scope.user = userName;
                $scope.password = password;

                if ($scope.user === "administrador" && $scope.password === "guillermo") {
                    $location.path('/profile');
                } else if ($scope.user === "cliente" && $scope.password === "guillermo") {
                    $location.path('/Cliente');
                } else {
                    $location.path('/login');
                    
                }

            };


        }
    ])

    // Path: /register
    .controller('RegisterCtrl', [
        '$scope', '$location', '$window', function($scope, $location, $window) {
            $scope.$root.title = 'AngularJS SPA | Register';
            // TODO: Register a new user
            $scope.login = function() {
                $location.path('/login');
                return false;
            };
        }
    ])

    // Path: /forgot-password
    .controller('ForgotPasswordCtrl', [
        '$scope', '$location', '$window', function($scope, $location, $window) {
            $scope.$root.title = 'AngularJS SPA | Recuperar password';
            // TODO: Forgot password
            $scope.RecoverPassword = function() {
                $scope.ShowMessage = true;
                // $location.path('/RecoverPassword');
                return false;
            };
        }
    ])

    // Path: /profile
    .controller('ProfileCtrl', [
        '$scope', '$location', '$window', function($scope, $location, $window) {
            $scope.$root.title = 'AngularJS SPA | Mi perfil';
            // TODO: Forgot password
            $scope.ligas = [
                {
                    nombre: 'Española',
                    pais: 'España',
                    inicio: new Date(),
                    fin: new Date(),
                    cant_equipos: 20,
                    id: 1
                },
                {
                    nombre: 'Italiana',
                    pais: 'Italia',
                    inicio: new Date(),
                    fin: new Date(),
                    cant_equipos: 21,
                    id: 2
                },
                {
                    nombre: 'Inglesa',
                    pais: 'Ingaltera',
                    inicio: new Date(),
                    fin: new Date(),
                    cant_equipos: 15,
                    id: 3
                },
                {
                    nombre: 'Francesa',
                    pais: 'Francia',
                    inicio: new Date(),
                    fin: new Date(),
                    cant_equipos: 21,
                    id: 4
                },
                {
                    nombre: 'China',
                    pais: 'China',
                    inicio: new Date(),
                    fin: new Date(),
                    cant_equipos: 15,
                    id: 5
                }
            ];

            $scope.ordenarPor = function(orden) {
                $scope.OrdenSeleccionado = orden;
            };
            $scope.AgregarLigabool = true;
            $scope.AgregarLiga = function (nombreLiga, nombreDePais, cantidadDEequipo) {
               
                $scope.ligas.push({
                    nombre: nombreLiga,
                    pais: nombreDePais,
                    inicio: new Date(),
                    fin: new Date,
                    cant_equipos: parseInt(cantidadDEequipo),
                    id: parseInt($scope.ligas.length+1)
                });

            };
            $scope.DeleteLiga = function (nombre) {
                for (var i = 0; i < $scope.ligas.length; i++) {
                    if ($scope.ligas[i].nombre === nombre) {
                        $scope.ligas.splice(i, 1);
                       }
                }
                
            };
        }
    ])

    // Path: /league
    .controller('LeagueCtrl', [
        '$scope', '$location', '$window', '$stateParams', function($scope, $location, $window, $stateParams) {
            $scope.$root.title = 'AngularJS SPA | Liga';

            //  $scope.param = $routeParams.param.toString();
            $scope.param = $stateParams.id;
            console.log($stateParams.id);
            // TODO: Forgot password
            /*  $scope.RecoverPassword = function () {
            $scope.ShowMessage = true;
            // $location.path('/RecoverPassword');
            return false;
        };
        */
            $scope.teamsFiltre = [];
            $scope.teams = [
                { nombre: 'Levante', id_liga: 1 }, { nombre: 'Barcelona', id_liga: 1 }, { nombre: 'Madrid', id_liga: 1 }, { nombre: 'Liverpool', id_liga: 2 }, { nombre: 'Manchester', id_liga: 2 },
                { nombre: 'Chelsea', id_liga: 2 }, { nombre: 'Genova', id_liga: 3 }, { nombre: 'Cagliari', id_liga: 3 }, { nombre: 'Inter', id_liga: 5 }, { nombre: 'Monaco', id_liga: 4 }, { nombre: 'Paris', id_liga: 4 },
                { nombre: 'France', id_liga: 4 }, { nombre: 'Shangai', id_liga: 5 }, { nombre: 'Sheck', id_liga: 5 }, { nombre: 'Chou', id_liga: 5 }
            ];

            $scope.DeleteTeam = function(nombre) {
                for (var i = 0; i < $scope.teams.length; i++) {
                    if ($scope.teams[i].nombre === nombre) {
                        $scope.teams.splice(i, 1);
                        inicio();
                    }
                }
            };

            $scope.isEditing = false;
            $scope.NombreAnterior = "";
            $scope.NuevoNombre = "";
            $scope.EditName = function(teamname) {
                $scope.isEditing = !$scope.isEditing;
                $scope.NombreAnterior = teamname;
                $scope.NuevoNombre = teamname;

            };

            var inicio = function() {
                $scope.teamsFiltre = [];
                for (var i = 0; i < $scope.teams.length; i++) {
                    if ($scope.teams[i].id_liga === parseInt($stateParams.id)) {
                        $scope.teamsFiltre.push($scope.teams[i]);
                    }
                }
            };

            inicio();
            $scope.NombreDeEquipo = "";
            $scope.NewTeam = function() {
                var team = { nombre: $scope.NombreDeEquipo, id_liga: parseInt($stateParams.id) };
                $scope.teams.push(team);
                inicio();
                $scope.NombreDeEquipo = "";
            };
            $scope.FinishEditing = function() {
                for (var i = 0; i < $scope.teams.length; i++) {
                    if ($scope.teams[i].nombre === $scope.NombreAnterior) {
                        $scope.teams[i].nombre = $scope.NuevoNombre;
                    }

                }
                $scope.isEditing = false;
                $scope.NuevoNombre = "";
                $scope.NombreAnterior = "";
                inicio();
            }
        }
    ])
   //Path :/Cliente
      .controller('ClienteCtrl', [
        '$scope', '$location', '$window', function($scope, $location, $window) {
            $scope.$root.title = 'AngularJS SPA | Cliente';
            $scope.ligasCliente = [
                { nombreDeLiga: "Italiana", idLiga: 2, fechaInicio: new Date, },
                { nombreDeLiga: "Inglesa", idLiga: 3, fechaInicio: new Date, },
                { nombreDeLiga: "Española", idLiga: 1, fechaInicio: new Date, }
            ];
            $scope.ligas = [
                {
                    nombre: 'Española',pais: 'España',inicio: new Date(),fin: new Date(),cant_equipos: 20,id: 1
                },
                {
                    nombre: 'Italiana',pais: 'Italia',inicio: new Date(),fin: new Date(),cant_equipos: 21,id: 2
                    
                },
                {
                    nombre: 'Inglesa',pais: 'Ingaltera',inicio: new Date(),fin: new Date(),cant_equipos: 15,id: 3
                },
                {
                    nombre: 'Francesa',pais: 'Francia',inicio: new Date(),fin: new Date(),cant_equipos: 21,id: 4
                },
                {
                    nombre: 'China',pais: 'China',inicio: new Date(),fin: new Date(),cant_equipos: 15,id: 5
                }
            ];
            $scope.ligasParaIncribirse = [];
            $scope.hide = true;
            var agregar = true;
            $scope.buscar = function() {
                $scope.hide = !$scope.hide;
                for (var i = 0; i <$scope.ligas.length ; i++) {
                    for (var j = 0; j < $scope.ligasCliente.length; j++) {
                      if ($scope.ligas[i].nombre=== $scope.ligasCliente[j].nombreDeLiga) {
                          agregar = false;
                      }  
                    }
                    if (agregar == true) {
                        var ligaas = $scope.ligas[i];
                        $scope.ligasParaIncribirse.push(ligaas);
                    }
                    agregar = true;
                }
            };
            $scope.suscibirse = function (nombre) {
                for (var i = 0; i < $scope.ligasParaIncribirse.length; i++) {
                    if ($scope.ligasParaIncribirse[i].nombre===nombre) {
                        $scope.ligasCliente.push({
                            nombreDeLiga: $scope.ligasParaIncribirse[i].nombre,
                            idLiga: $scope.ligasCliente.length + 1,
                            fechaInicio: new Date
                        });
                        $scope.ligasParaIncribirse.splice(i, 1);
                    }
                }
            };

        }
    ])
    // Path: /error/404
    .controller('Error404Ctrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'Error 404: Page Not Found';
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }]);