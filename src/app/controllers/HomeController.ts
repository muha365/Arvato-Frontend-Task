/// <reference path="../../../typings/globals/gapi/index.d.ts" />
namespace arvato.services {

    class HomeController {
        searchKey: string = "dash berlin";
        static $inject = ["VideoService"];
        constructor(private $mediaService: IVideoService) {
        }
    }
    angular.module("MainModule").controller("HomeController", HomeController);
}