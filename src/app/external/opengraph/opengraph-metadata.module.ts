import { Module } from '@nestjs/common';
import ogs from 'open-graph-scraper';
import { OpenGraphScraperOptions } from 'open-graph-scraper/types/lib/types';
import { HttpModule } from '../http-client/http.module';
import { OpenGraphService } from './services/opengraph-meatadata.service';

@Module({
    imports: [HttpModule],
    providers: [
        OpenGraphService,
        {
            provide: 'OG_SCRAPER',
            useFactory: () => {
                return async (options: OpenGraphScraperOptions) => {
                    return await ogs(options);
                };
            },
        },
    ],
    exports: [OpenGraphService],
})
export class OpenGraphModule {}
