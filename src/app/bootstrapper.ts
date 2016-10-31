/// <reference path="../../typings/globals/gapi/index.d.ts" />
function Initialize() {
    gapi.client.setApiKey("AIzaSyAdR5637c8hp3mQv9m49Zz2GukLGSBATJc");
    gapi.client.load("youtube", "v3", function() {
        console.log("youtube loaded");
        angular.bootstrap(document, ["MainModule"]);
    });
}