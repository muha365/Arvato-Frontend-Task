(function (angular) {
    angular.module("MainModule", ["ngRoute"])
        .config(Config);
    Config.$inject = ["$routeProvider", "$locationProvider"];
    function Config($routeProvider, $locationProvider) {
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
    angular.module("MainModule").run(function () {
        var tag = document.createElement("script");
        tag.src = "http://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    });
})(angular);
