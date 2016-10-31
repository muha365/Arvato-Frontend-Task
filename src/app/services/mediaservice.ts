namespace arvatotube.services {

    export interface IVideo {
        Title: string;
        Id: string;
        Author: string;
        ViewsCount: number;
    }

    export interface IVideoService {
        Search(filter?: string): ng.IPromise<IVideo[]>;
        Get(id: string): ng.IPromise<IVideo>;
        GetList(): IVideo[];
        AddToList(video: IVideo);
    }

    export class VideoService implements IVideoService {

        static $inject = ["$http"];
        constructor(private $http: ng.IHttpService) {

        }

        Search(filter?: string): ng.IPromise<IVideo[]> {
            throw new Error("not implemented");
        }

        Get(id: string): ng.IPromise<IVideo> {
            throw new Error("not implemented");
        }

        GetList(): IVideo[] {
            throw new Error("not implemented");
        }

        AddToList(video: IVideo): void {
            throw new Error("not implemented");
        }
    }
}