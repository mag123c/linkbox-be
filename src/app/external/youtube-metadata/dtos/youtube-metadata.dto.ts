// export class YoutubeMetaRes {
//     items: YoutubeMetaItem[] = [];
// }

// export class YoutubeMetaItem {
//     id!: string;
//     snippet!: YoutubeMetaSnippet;
//     statistics!: YoutubeMetaStatistics;
// }

// export class YoutubeMetaSnippet {
//     title!: string;
//     description!: string;
//     channelTitle!: string;
//     publishedAt!: Date;
//     thumbnails!: YoutubeMetaThumbnail;
// }

// export class YoutubeMetaThumbnail {
//     default!: YoutubeMetaThumbnail;
// }

// export class YoutubeMetaStatistics {
//     viewCount!: number;
//     likeCount!: number;
//     commentCount!: number;
// }

export class YoutubeMetadataRes {
    videoId!: string;
    title!: string;
    publishedAt!: Date;
    thumbnail!: string;

    static of(data: any): YoutubeMetadataRes {
        const dto = new YoutubeMetadataRes();
        dto.videoId = data.videoId;
        dto.title = data.title;
        dto.publishedAt = data.publishedAt;
        dto.thumbnail = data.thumbnail;
        return dto;
    }
}
