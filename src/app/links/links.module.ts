import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinksController } from './controllers/links.controller';
import { Links } from './entities/links.entity';
import { LinksRepository } from './repositories/links.repository';
import { LinksService } from './services/links.service';

@Module({
    imports: [TypeOrmModule.forFeature([Links])],
    providers: [LinksService, LinksRepository],
    controllers: [LinksController],
})
export class LinksModule {}
