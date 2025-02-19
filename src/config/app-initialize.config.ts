import type { INestApplication } from '@nestjs/common';
import compression from 'compression';
import { setupCors } from './cors.config';
import { setupPipe } from './global-pipe.config';

export const setupAppConfig = async (app: INestApplication) => {
    //Res compression -> network resource ↓
    app.use(compression());

    //Trusted Proxy
    const expressApp = app.getHttpAdapter().getInstance();
    expressApp.set('trust proxy', true);

    //prefix
    app.setGlobalPrefix('api/v1');

    setupCors(app);
    setupPipe(app);
};
