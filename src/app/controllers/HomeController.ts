/// <reference path="../../../typings/globals/gapi/index.d.ts" />
namespace arvato.services {
    export class PageInfo implements IPageInfo {
        totalResults: number;
        resultsPerPage: number;
    }
    export class SearchResult implements IVideoSearchResult {
        nextPageToken: string;
        prevPageToken: string;
        pageInfo: IPageInfo;
        items: Video[];
    }
    export class Video implements IVideo {
        id: Video;
        snippet: IVideoSnippet;
        thumbnails: IVideoThumbnail;
    }
    export class VideoId implements IVideoId {
        videoId: string;
    }
    export class VideoSnippet implements IVideoSnippet {
        title: string;
        description: string;
        channelTitle: string;
        thumbnails: VideoThumbnail;
    }
    export class VideoThumbnail implements IVideoThumbnail {
        default: Thumbnail;
        medium: Thumbnail;
        high: Thumbnail;
    }
    export class Thumbnail implements IThumbnail {
        url: string;
        width: number;
        height: number;
    }
    export class VideoCategoyResult implements IVideoCategoriesResult {
        etag: string;
        kind: string;
        items: ICategory[];
    }
    export class Category implements ICategory {
        id: string;
        snippet: ICategorySnippet;
    }
    export class CategorySnippet implements ICategorySnippet {
        channelId: string;
        title: string;
    }

    class HomeController {
        query: string = "black hole recordings";
        categories: ICategory[] = [];
        selectedCategory: ICategory;
        searchResult: IVideoSearchResult;
        playList: IVideo[] = [];

        static $inject = ["VideoService"];
        constructor(private $mediaService: IVideoService) {
            let vm = this;
            if (!$mediaService) {
                throw Error("$mediaService shouldn't be null");
            }
            this.$mediaService.GetCatgories().then(function(result: IVideoCategoriesResult) {
                vm.categories = result.items;
            });
            this.SearchCmd();

        }
        CategorySelected(category: ICategory): void {
            this.selectedCategory = category;
        };

        SearchCmd() {
            let vm = this;
            this.$mediaService.Search(vm.query).then(function(result: IVideoSearchResult) {
                vm.searchResult = result;
                console.log(vm.searchResult);
            });
        };

        addToList(video: IVideo) {
            this.playList.push(video);
            console.log(this.playList);
        }

        removeFromList(video: IVideo) {
            let index = this.playList.indexOf(video);
            this.playList.splice(index, 1);
        }

        isInList(video: IVideo) {
            return (this.playList.indexOf(video) !== -1);
        }

    }
    angular.module("MainModule").controller("HomeController", HomeController);
}