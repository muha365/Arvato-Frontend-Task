/// <reference path="../../typings/globals/gapi/index.d.ts" />
((angular: ng.IAngularStatic) => {
    angular.module("MainModule", ["ngRoute", "ngAnimate"])
        .config(Config);

    Config.$inject = ["$routeProvider", "$locationProvider"];
    function Config($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) {
        // enable html5 urls
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        // routining configuration
        $routeProvider.when("/", {
            controller: "HomeController",
            templateUrl: "/app/views/home/index.html",
            controllerAs: "vm"
        }).otherwise({
            redirectTo: "/"
        });
    }

    angular.module("MainModule").run(() => {

    });
})(angular);

function Initialize() {
    gapi.client.setApiKey("AIzaSyAdR5637c8hp3mQv9m49Zz2GukLGSBATJc");
    gapi.client.load("youtube", "v3", function() {
        console.log("youtube loaded");
        angular.bootstrap(document, ["MainModule"]);
    });
}