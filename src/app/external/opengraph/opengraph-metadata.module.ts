import { Module } from '@nestjs/common';
import { HttpModule } from '../http-client/http.module';
import { OpenGraphService } from './services/opengraph-meatadata.service';

@Module({
    imports: [HttpModule],
    providers: [OpenGraphService],
    exports: [OpenGraphService],
})
export class OpenGraphModule {}
