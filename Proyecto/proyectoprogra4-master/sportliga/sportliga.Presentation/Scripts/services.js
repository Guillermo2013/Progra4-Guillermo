'use strict';

// Demonstrate how to register services
// In this case it is a simple value service.
'use strict';
var server = 'http://localhost:1367';
angular.module('app.services', [])
    .factory('Account', function ($http) {
        return {
            login: function (loginModel, success, error) {

                $http
                    .post(
                        server + '/login', loginModel)
                    .success(function (response) {
                        success(response);
                    })
                    .error(error);
            },
            register: function (registerModel, success, error) {
                $http.post(server + '/register', registerModel).success(function (response) {
                    success(response);
                }).error(error);
            }
        };
    });