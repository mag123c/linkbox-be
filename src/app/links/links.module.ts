import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpenGraphModule } from '../external/opengraph/opengraph-metadata.module';
import { YoutubeMetadataModule } from '../external/youtube-metadata/yotuube-metadata.module';
import { LinksController } from './controllers/links.controller';
import { Links } from './entities/links.entity';
import { LinksRepository } from './repositories/links.repository';
import { LinksService } from './services/links.service';

@Module({
    imports: [TypeOrmModule.forFeature([Links]), YoutubeMetadataModule, OpenGraphModule],
    providers: [LinksService, LinksRepository],
    controllers: [LinksController],
})
export class LinksModule {}
