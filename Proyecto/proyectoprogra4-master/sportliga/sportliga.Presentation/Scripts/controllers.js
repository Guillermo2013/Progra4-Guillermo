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
            $scope.ShowMessage = false;
            $scope.Cuentas = function(userName, password) {
                $scope.user = userName;
                $scope.password = password;

                if ($scope.user === "administrador" && $scope.password === "guillermo") {
                    $location.path('/profile');
                } else if ($scope.user === "cliente" && $scope.password === "guillermo") {
                    $location.path('/Cliente');
                } else {
                    $scope.ShowMessage = true;
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
                { nombre: 'Española', pais: 'España',inicio: new Date(),fin: new Date(),cant_equipos: 20,id: 1},
                { nombre: 'Italiana',pais: 'Italia',inicio: new Date(),fin: new Date(),cant_equipos: 21,id: 2},
                { nombre: 'Inglesa',pais: 'Ingaltera',inicio: new Date(),fin: new Date(),cant_equipos: 15,id: 3},
                { nombre: 'Francesa',pais: 'Francia',inicio: new Date(),fin: new Date(),cant_equipos: 21,id: 4},
                { nombre: 'China',pais: 'China',inicio: new Date(),fin: new Date(),cant_equipos: 15,id: 5}
            ];

            $scope.ordenarPor = function(orden) {
                $scope.OrdenSeleccionado = orden;
            };
            $scope.AgregarLigabool = true;
            $scope.Editar = false;
            $scope.AgregarLiga = function (nombreLiga, nombreDePais, cantidadDEequipo) {
                if (parseInt(nombreLiga) >0 && parseInt(nombreDePais) > 0) {
                 $scope.nombreLiga = "";
                    $scope.nombreDePais = "";
                    $scope.MasQueNumero = true;
                } else {
                    $scope.ligas.push({
                        nombre: nombreLiga,
                        pais: nombreDePais,
                        inicio: $scope.FechaInicio,
                        fin: $scope.FechaFinal,
                        cant_equipos: parseInt(cantidadDEequipo),
                        id: parseInt($scope.ligas.length + 1)
                    });
                    $scope.nombreLiga = "";
                    $scope.nombreDePais = "";
                    $scope.FechaInicio = new Date();
                    $scope.FechaFinal = new Date();
                    $scope.cantidadDEequipo = null;
                    $scope.MasQueNumero = false;
                }
            };
            
            $scope.DeleteLiga = function (nombre) {
                for (var i = 0; i < $scope.ligas.length; i++) {
                    if ($scope.ligas[i].nombre === nombre) {
                        $scope.ligas.splice(i, 1);
                       }
                }
                
            };
           
            $scope.AntesDeEditar = [{
                nombre: '',
                pais: '',
                inicio: new Date(),
                fin: new Date(),
                cant_equipos: 0,
                id: 0
            }];
            $scope.EditarLiga = function (ligaName) {
                $scope.AgregarLigabool = false;
                $scope.Editar = true;
                for (var i = 0;i<$scope.ligas.length;i++) {
                    if ($scope.ligas[i].nombre === ligaName) {
                        $scope.AntesDeEditar[0] = $scope.ligas[i];
                        $scope.nombreLigae = $scope.ligas[i].nombre;
                        $scope.nombreDePaise = $scope.ligas[i].pais;
                        $scope.EditarFechaInicio = $scope.ligas[i].inicio;
                        $scope.EditarFechaFinal = $scope.ligas[i].fin;
                        $scope.cantidadDEequipose = $scope.ligas[i].cant_equipos;
                    }
                }
            };
            $scope.AceptarEdicion = function (nombreLigae, nombreDePaise, cantidadDEequipose) {
                if (parseInt(nombreLigae) > 0 && parseInt(nombreDePaise) > 0) {
                    $scope.nombreLigae = "";
                    $scope.nombreDePaise = "";
                    $scope.MasQueNumero = true;
                } else {
                    for (var i = 0; i < $scope.ligas.length; i++) {
                        if ($scope.ligas[i].nombre === $scope.AntesDeEditar[0].nombre) {
                            $scope.ligas[i].nombre = nombreLigae;
                            $scope.ligas[i].pais = nombreDePaise;
                            $scope.ligas[i].inicio = $scope.EditarFechaInicio;
                            $scope.ligas[i].fin = $scope.EditarFechaFinal;
                            $scope.ligas[i].cant_equipos = parseInt(cantidadDEequipose);
                        }
                    }

                    $scope.AgregarLigabool = true;
                    $scope.Editar = false;
                    $scope.MasQueNumero = false;

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
                 { nombre: 'Levante', id_liga: 1, partidosJugados: 10, partidosGanados: 5, partidosPerdidos: 5, goles: 5 },
                 { nombre: 'Barcelona', id_liga: 1, partidosJugados: 9, partidosGanados: 4, partidosPerdidos: 5, goles: 7 },
                 { nombre: 'Madrid', id_liga: 1, partidosJugados: 9, partidosGanados: 5, partidosPerdidos: 4, goles: 7 },
                 { nombre: 'Liverpool', id_liga: 2, partidosJugados: 2, partidosGanados: 1, partidosPerdidos: 1, goles: 2 },
                 { nombre: 'Manchester', id_liga: 2, partidosJugados: 2, partidosGanados: 1, partidosPerdidos: 1, goles: 2 },
                 { nombre: 'Chelsea', id_liga: 2, partidosJugados: 2, partidosGanados: 1, partidosPerdidos: 1, goles: 2 },
                 { nombre: 'Genova', id_liga: 3, partidosJugados: 2, partidosGanados: 1, partidosPerdidos: 1, goles: 2 },
                 { nombre: 'Cagliari', id_liga: 3, partidosJugados: 2, partidosGanados: 1, partidosPerdidos: 1, goles: 2 },
                 { nombre: 'Inter', id_liga: 3, partidosJugados: 2, partidosGanados: 1, partidosPerdidos: 1, goles: 2 },
                 { nombre: 'Monaco', id_liga: 4, partidosJugados: 2, partidosGanados: 1, partidosPerdidos: 1, goles: 2 },
                 { nombre: 'Paris', id_liga: 4, partidosJugados: 2, partidosGanados: 1, partidosPerdidos: 1, goles: 2 },
                 { nombre: 'France', id_liga: 4, partidosJugados: 2, partidosGanados: 1, partidosPerdidos: 1, goles: 2 },
                 { nombre: 'Shangai', id_liga: 5, partidosJugados: 2, partidosGanados: 1, partidosPerdidos: 1, goles: 2 },
                 { nombre: 'Sheck', id_liga: 5, partidosJugados: 2, partidosGanados: 1, partidosPerdidos: 1, goles: 2 },
                 { nombre: 'Chou', id_liga: 5, partidosJugados: 2, partidosGanados: 1, partidosPerdidos: 1, goles: 2 }
            ];
            
            var inicio = function () {
                $scope.teamsFiltre = [];
                for (var i = 0; i < $scope.teams.length; i++) {
                    if ($scope.teams[i].id_liga === parseInt($stateParams.id)) {
                        $scope.teamsFiltre.push($scope.teams[i]);
                    }
                }
            };

            inicio();
            $scope.NewTeam = function () {
                if (parseInt($scope.NuevoNombre) > 0) {
                    $scope.NuevoNombre = "";
                    $scope.MasQueNumero = true;
                } else {
                    var team = [
                    {
                        nombre: $scope.NuevoNombre,
                        id_liga: parseInt($stateParams.id),
                        partidosJugados: parseInt($scope.partidosJugados),
                        partidosGanados: parseInt($scope.partidosGanados),
                        partidosPerdidos: parseInt($scope.partidosPerdidos),
                        goles: parseInt($scope.goles)
                    }
                    ];
                    $scope.teams.push(team[0]);
                    inicio();
                    $scope.NuevoNombre = "";
                    $scope.partidosJugados = "";
                    $scope.partidosGanados = "";
                    $scope.partidosPerdidos = "";
                    $scope.goles = "";
                    $scope.MasQueNumero = false;    
                }
            };
            $scope.DeleteTeam = function(nombre) {
                for (var i = 0; i < $scope.teams.length; i++) {
                    if ($scope.teams[i].nombre === nombre) {
                        $scope.teams.splice(i, 1);
                        inicio();
                    }
                }
            };

            $scope.isEditing = false;
            $scope.EquipoEditado = [
            {
                nombre: "",
                    id_liga:0, 
                    partidosJugados:0,
                    partidosGanados:0,
                    partidosPerdidos:0,
                    goles: 0
                }
            ];
            $scope.NombreAbuscar = "";
            $scope.EditName = function(teamname) {
                $scope.isEditing = true;
                for (var i = 0; i < $scope.teams.length; i++) {
                    if ($scope.teams[i].nombre===teamname) {
                        $scope.NuevoNombre = $scope.teams[i].nombre;
                        $scope.NombreAbuscar = $scope.teams[i].nombre;
                        $scope.partidosJugados = $scope.teams[i].partidosJugados;
                        $scope.partidosGanados = $scope.teams[i].partidosGanados;
                        $scope.partidosPerdidos = $scope.teams[i].partidosPerdidos;
                        $scope.goles = $scope.teams[i].goles;
                    }
                    
                }

            };

           
            $scope.NombreDeEquipo = "";
           
            $scope.FinishEditing = function() {
                if (parseInt($scope.NuevoNombre) > 0) {
                   $scope.NuevoNombre = "";
                    $scope.MasQueNumero = true;
                } else {
                    $scope.isEditing = false;
                    for (var i = 0; i < $scope.teams.length; i++) {
                        if ($scope.teams[i].nombre === $scope.NombreAbuscar) {
                            $scope.teams[i].nombre = $scope.NuevoNombre;
                            $scope.teams[i].partidosJugados = parseInt($scope.partidosJugados);
                            $scope.teams[i].partidosGanados = parseInt($scope.partidosGanados);
                            $scope.teams[i].partidosPerdidos = parseInt($scope.partidosPerdidos);
                            $scope.teams[i].goles = parseInt($scope.goles);
                        }

                    }

                    inicio();
                    $scope.NuevoNombre = "";
                    $scope.partidosJugados = "";
                    $scope.partidosGanados = "";
                    $scope.partidosPerdidos = "";
                    $scope.goles = "";
                    $scope.MasQueNumero = false;
                }
            }
            $scope.cancelarEdit=function()
            {
                $scope.NuevoNombre = "";
                $scope.partidosJugados = "";
                $scope.partidosGanados = "";
                $scope.partidosPerdidos = "";
                $scope.goles = "";
                $scope.isEditing = !$scope.isEditing;
                $scope.MasQueNumero = false;
            };

        }
    ])
   //Path :/Cliente
      .controller('ClienteCtrl', [
        '$scope', '$location', '$window', function($scope, $location, $window) {
            $scope.$root.title = 'AngularJS SPA | Cliente';
            $scope.ligasCliente = [
                { nombreDeLiga: "Italiana", idLiga: 1, fechaInicio: new Date, },
                { nombreDeLiga: "Inglesa", idLiga: 2, fechaInicio: new Date, },
                { nombreDeLiga: "Española", idLiga: 3, fechaInicio: new Date, }
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
                $scope.hide = false;
            };
            $scope.FinalizarBusqueda=function() {
                $scope.hide = true;
            }
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
    //Path :/cleague/:id
    .controller('CLeagueCtrl', [
        '$scope', '$location', '$window', '$stateParams', function ($scope, $location, $window, $stateParams) {
            $scope.$root.title = 'AngularJS SPA | ClienteLeague';


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
            $scope.PartidosDeLeague = [
                 { id_league: 1, equipo_uno: "Levante", equipo_dos: "Barcelona", goles_uno: 0, goles_dos: 0, },
                 { id_league: 1, equipo_uno: "Barcelona", equipo_dos: "Levante", goles_uno: 0, goles_dos: 0, },
                 { id_league: 1, equipo_uno: "Madrid", equipo_dos: "Barcelona", goles_uno: 0, goles_dos: 0, },
                 { id_league: 2, equipo_uno: "Liverpool", equipo_dos: "Manchester", goles_uno: 0, goles_dos: 0, },
                 { id_league: 2, equipo_uno: "Manchester", equipo_dos: "Liverpool", goles_uno: 0, goles_dos: 0, },
                 { id_league: 2, equipo_uno: "Liverpool", equipo_dos: "Chelsea", goles_uno: 0, goles_dos: 0, },
                 { id_league: 3, equipo_uno: "Genova", equipo_dos: "Cagliari", goles_uno: 0, goles_dos: 0, },
                 { id_league: 3, equipo_uno: "Cagliari", equipo_dos: "Genova", goles_uno: 0, goles_dos: 0, },
                 { id_league: 3, equipo_uno: "Inter", equipo_dos: "Genova", goles_uno: 0, goles_dos: 0, },
                 { id_league: 4, equipo_uno: "Monaco", equipo_dos: "Paris", goles_uno: 0, goles_dos: 0, },
                 { id_league: 4, equipo_uno: "Paris", equipo_dos: "Monaco", goles_uno: 0, goles_dos: 0, },
                 { id_league: 4, equipo_uno: "France", equipo_dos: "Monaco", goles_uno: 0, goles_dos: 0, },
                 { id_league: 5, equipo_uno: "Shangai", equipo_dos: "Sheck", goles_uno: 0, goles_dos: 0, },
                 { id_league: 5, equipo_uno: "Sheck", equipo_dos: "Shangai", goles_uno: 0, goles_dos: 0, },
                { id_league: 5, equipo_uno: "Chou", equipo_dos: "Sheck", goles_uno: 0, goles_dos: 0, }
            ];
            $scope.partidosJugadosFilter = [];

            var inicio = function () {
                $scope.teamsFiltre = [];
                for (var i = 0; i < $scope.PartidosDeLeague.length; i++) {
                    if ($scope.PartidosDeLeague[i].id_league === parseInt($stateParams.id)) {
                        $scope.partidosJugadosFilter.push($scope.PartidosDeLeague[i]);
                    }
                }
            };

            inicio();
            $scope.PredecirBool = false;
            $scope.equipo1 = "";
            $scope.equipo2 = "";
            $scope.PredecirPartido = function (equipo_uno, equipo_dos) {
                $scope.equipo1 = equipo_uno;
                $scope.equipo2 = equipo_dos;
                $scope.PredecirBool = true;
            };
            $scope.Predecir = function () {

                for (var i = 0; i < $scope.partidosJugadosFilter.length; i++) {
                    if ($scope.partidosJugadosFilter[i].equipo_uno === $scope.equipo1 && $scope.partidosJugadosFilter[i].equipo_dos === $scope.equipo2) {
                        $scope.partidosJugadosFilter[i].goles_uno = parseInt($scope.Goles1);
                        $scope.partidosJugadosFilter[i].goles_dos = parseInt($scope.Goles2);
                    }
                }
                $scope.PredecirBool = false;
                $scope.equipo1 = "";
                $scope.equipo2 = "";
                $scope.Goles1 = "";
                $scope.Goles2 = "";
            };
        }
    ])
     .controller('ADPartidosCtrl', [
        '$scope', '$location', '$window', '$stateParams', function ($scope, $location, $window, $stateParams) {
            $scope.$root.title = 'AngularJS SPA | ADPartidos';


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
            $scope.PartidosDeLeague = [
                { id_league: 1, equipo_uno: "Levante", equipo_dos: "Barcelona", goles_uno: 0, goles_dos: 0, fecha:new Date()},
                { id_league: 1, equipo_uno: "Barcelona", equipo_dos: "Levante", goles_uno: 0, goles_dos: 0, fecha: new Date() },
                { id_league: 1, equipo_uno: "Madrid", equipo_dos: "Barcelona", goles_uno: 0, goles_dos: 0, fecha: new Date() },
                { id_league: 2, equipo_uno: "Liverpool", equipo_dos: "Manchester", goles_uno: 0, goles_dos: 0, fecha: new Date() },
                { id_league: 2, equipo_uno: "Manchester", equipo_dos: "Liverpool", goles_uno: 0, goles_dos: 0, fecha: new Date() },
                { id_league: 2, equipo_uno: "Liverpool", equipo_dos: "Chelsea", goles_uno: 0, goles_dos: 0, fecha: new Date() },
                { id_league: 3, equipo_uno: "Genova", equipo_dos: "Cagliari", goles_uno: 0, goles_dos: 0, fecha: new Date() },
                { id_league: 3, equipo_uno: "Cagliari", equipo_dos: "Genova", goles_uno: 0, goles_dos: 0, fecha: new Date() },
                { id_league: 3, equipo_uno: "Inter", equipo_dos: "Genova", goles_uno: 0, goles_dos: 0, fecha: new Date() },
                { id_league: 4, equipo_uno: "Monaco", equipo_dos: "Paris", goles_uno: 0, goles_dos: 0, fecha: new Date() },
                { id_league: 4, equipo_uno: "Paris", equipo_dos: "Monaco", goles_uno: 0, goles_dos: 0, fecha: new Date() },
                { id_league: 4, equipo_uno: "France", equipo_dos: "Monaco", goles_uno: 0, goles_dos: 0, fecha: new Date() },
                { id_league: 5, equipo_uno: "Shangai", equipo_dos: "Sheck", goles_uno: 0, goles_dos: 0, fecha: new Date() },
                { id_league: 5, equipo_uno: "Sheck", equipo_dos: "Shangai", goles_uno: 0, goles_dos: 0, fecha: new Date() },
               { id_league: 5, equipo_uno: "Chou", equipo_dos: "Sheck", goles_uno: 0, goles_dos: 0, }
            ];
            $scope.partidosJugadosFilter = [];
            var inicio2 = function () {
                for (var i = 0; i < $scope.PartidosDeLeague.length; i++) {
                    if ($scope.PartidosDeLeague[i].id_league === parseInt($stateParams.id)) {
                        $scope.partidosJugadosFilter.push($scope.PartidosDeLeague[i]);
                    }
                }
            };
            inicio2();
            $scope.EditarBool = false;
            $scope.NuevoPartido = true;
            $scope.PredecirBool = false;
            $scope.equipo1 = "";
            $scope.equipo2 = "";
            $scope.PredecirPartido = function(equipo_uno, equipo_dos) {
                $scope.equipo1 = equipo_uno;
                $scope.equipo2 = equipo_dos;
                $scope.PredecirBool = true;
                $scope.NuevoPartido = false;
                $scope.EditarBool = false;
            };
            $scope.Predecir = function() {
                
                for (var i = 0; i < $scope.partidosJugadosFilter.length; i++) {
                    if ($scope.partidosJugadosFilter[i].equipo_uno === $scope.equipo1 && $scope.partidosJugadosFilter[i].equipo_dos === $scope.equipo2) {
                        $scope.partidosJugadosFilter[i].goles_uno = parseInt($scope.Goles1);
                        $scope.partidosJugadosFilter[i].goles_dos = parseInt($scope.Goles2);
                    }
                }
                $scope.PredecirBool = false;
                $scope.equipo1 = "";
                $scope.equipo2 = "";
                $scope.Goles1 = "";
                $scope.Goles2 = "";
                $scope.NuevoPartido = true;
            };
            $scope.AgregarPartido=function() {
                if (parseInt($scope.Equipo_1) > 0 && parseInt($scope.Equipo_2) > 0) {
                    $scope.Equipo_1 = "";
                    $scope.Equipo_2 = "";
                    $scope.MasQueNumero = true;
                } else {
                    $scope.partidosJugadosFilter.push({
                        id_league: parseInt($stateParams.id),
                        equipo_uno: $scope.Equipo_1,
                        equipo_dos: $scope.Equipo_2,
                        goles_uno: 0,
                        goles_dos: 0,
                        fecha: $scope.Fecha
                    });
                    $scope.Equipo_1 = "";
                    $scope.Equipo_2 = "";
                    $scope.MasQueNumero = false;
                }
              }
            $scope.temporaNombreE1 = "";
            $scope.temporaNombreE2 = "";
            $scope.EditPartido = function(equipo_uno, equipo_dos,goles_uno,goles_dos,fecha) {
                $scope.NuevoPartido = false;
                $scope.EditarBool = true;
                $scope.PredecirBool = false;
                $scope.NuevoEquipo1 = equipo_uno;
                $scope.NuevoEquipo2 = equipo_dos;
                $scope.temporaNombreE1 = equipo_uno;
                $scope.temporaNombreE2 =  equipo_dos;
                $scope.NuevoEquipoGoles1 = goles_uno;
                $scope.NuevoEquipoGoles2 = goles_dos;
                $scope.NuevaFecha = new Date(fecha);

            };
            $scope.AceptarEdicion = function() {
                if (parseInt($scope.NuevoEquipo1) > 0 && parseInt($scope.NuevoEquipo2) > 0) {
                    $scope.NuevoEquipo1 = "";
                    $scope.NuevoEquipo2 = "";
                    $scope.MasQueNumero = true;
                } else {
                    for (var i = 0; i < $scope.partidosJugadosFilter.length; i++) {
                        if ($scope.partidosJugadosFilter[i].equipo_uno === $scope.temporaNombreE1 && $scope.partidosJugadosFilter[i].equipo_dos === $scope.temporaNombreE2) {
                            $scope.partidosJugadosFilter[i].equipo_uno = $scope.NuevoEquipo1;
                            $scope.partidosJugadosFilter[i].equipo_dos = $scope.NuevoEquipo2;
                            $scope.partidosJugadosFilter[i].goles_uno = parseInt($scope.NuevoEquipoGoles1);
                            $scope.partidosJugadosFilter[i].goles_dos = parseInt($scope.NuevoEquipoGoles2);
                            $scope.partidosJugadosFilter[i].fecha = $scope.NuevaFecha;
                        }

                    }
                    $scope.NuevoPartido = true;
                    $scope.EditarBool = false;
                    $scope.NuevoEquipo1 = "";
                    $scope.NuevoEquipo2 = "";
                    $scope.temporaNombreE1 = "";
                    $scope.temporaNombreE2 = "";
                    $scope.NuevoEquipoGoles1 = "";
                    $scope.NuevoEquipoGoles2 = "";
                    $scope.NuevaFecha = new Date();
                    $scope.MasQueNumero = false;
                }
              };
            $scope.DeletePartido=function(equipo_uno, equipo_dos) {
                for (var i = 0; i < $scope.partidosJugadosFilter.length; i++) {
                    if ($scope.partidosJugadosFilter[i].equipo_uno === equipo_uno && $scope.partidosJugadosFilter[i].equipo_dos === equipo_dos) {
                        $scope.partidosJugadosFilter.splice(i, 1);
                    }
                }
            }
        }
     ])

    // Path: /error/404
    .controller('Error404Ctrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'Error 404: Page Not Found';
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }]);