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

    static of(res: OGScrapeRes): OpengraphMetadataRes {
        const dto = new OpengraphMetadataRes();
        dto.title = res.ogTitle || '';
        dto.description = res.ogDescription || '';
        dto.thumbnail = res.ogImage?.[0]?.url || '';
        return dto;
    }
}

export class OGScrapeRes {
    ogTitle?: string;
    ogType?: string;
    ogUrl?: string;
    ogDescription?: string;
    ogImage?: OGImage[];
    requestUrl!: string;
    success!: boolean;

    static of(data: any): OGScrapeRes {
        const dto = new OGScrapeRes();
        dto.ogTitle = data.ogTitle;
        dto.ogType = data.ogType;
        dto.ogUrl = data.ogUrl;
        dto.ogDescription = data.ogDescription;
        dto.ogImage = data.ogImage;
        dto.requestUrl = data.requestUrl;
        dto.success = data.success;
        return dto;
    }
}

export class OGImage {
    height?: string;
    type?: string;
    url?: string;
    width?: string;
}
