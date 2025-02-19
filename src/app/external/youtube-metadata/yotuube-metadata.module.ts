import { Module } from '@nestjs/common';
import { HttpModule } from '../http-client/http.module';
import { YoutubeMetadataService } from './services/youtube-meatadata.service';

@Module({
    imports: [HttpModule],
    providers: [YoutubeMetadataService],
    exports: [YoutubeMetadataService],
})
export class YoutubeMetadataModule {}
