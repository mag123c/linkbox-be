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

export class OpengraphMetadataRes {
    title!: string;
    description!: string;
    thumbnail!: string;

    static of(data: any): OpengraphMetadataRes {
        const dto = new OpengraphMetadataRes();
        dto.title = data.title;
        dto.description = data.description;
        dto.thumbnail = data.thumbnail;
        return dto;
    }
}
