namespace arvato.services {

    export interface IPageInfo {
        totalResults: number;
        resultsPerPage: number;
    }
    export interface IVideoSearchResult {
        nextPageToken: string;
        prevPageToken: string;
        pageInfo: IPageInfo;
        items: IVideo[];
    }
    export interface IVideo {
        id: IVideo;
        snippet: IVideoSnippet;
        thumbnails: IVideoThumbnail;
    }
    export interface IVideoId {
        videoId: string;
    }
    export interface IVideoSnippet {
        title: string;
        description: string;
        channelTitle: string;
        thumbnails: IVideoThumbnail;
    }
    export interface IVideoThumbnail {
        default: IThumbnail;
        medium: IThumbnail;
        high: IThumbnail;
    }
    export interface IThumbnail {
        url: string;
        width: number;
        height: number;
    }
    export interface IVideoCategoriesResult {
        etag: string;
        kind: string;
        items: ICategory[];
    }
    export interface ICategory {
        id: string;
        snippet: ICategorySnippet;
    }
    export interface ICategorySnippet {
        channelId: string;
        title: string;
    }
    export interface IVideoService {
        Search(filter?: string): ng.IPromise<IVideoSearchResult>;
        GetCatgories(): ng.IPromise<IVideoCategoriesResult>;
    }


    export class VideoService implements IVideoService {

        static $inject = ["$http", "YoutubeKey"];
        constructor(private $http: ng.IHttpService, private $key: string) {
            console.log("YK: " + this.$key);
        }

        Search(filter?: string): ng.IPromise<IVideoSearchResult> {
            return this.$http.get("https://www.googleapis.com/youtube/v3/search", {
                params: {
                    part: "snippet",
                    q: filter,
                    type: "video",
                    order: "viewCount",
                    maxResults: 25,
                    key: this.$key
                }
            }).then(function (d) {
                return d.data;
            });
        }

        GetCatgories(): ng.IPromise<IVideoCategoriesResult> {
            return this.$http.get("https://www.googleapis.com/youtube/v3/videoCategories", {
                params: { part: "snippet", key: this.$key, regionCode: "my" }
            }).then(function (d) {
                return d.data;
            });
        }
    }

    VideoServiceFactory.$inject = ["$http", "YoutubeKey"];
    function VideoServiceFactory($http: ng.IHttpService, $key: string): IVideoService {
        return new VideoService($http, $key);
    }
    angular.module("MainModule").factory("VideoService", VideoServiceFactory);
}