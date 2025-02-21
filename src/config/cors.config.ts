import type { INestApplication } from '@nestjs/common';
import { isProduction } from '../common/utils/env.util';

export const setupCors = (app: INestApplication) => {
    const allowedOrigins: string[] = process.env.WEBVIEW_URL ? [process.env.WEBVIEW_URL] : [];

    app.enableCors({
        origin: isProduction()
            ? (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
                  if (!origin || allowedOrigins.includes(origin)) {
                      callback(null, true);
                  } else {
                      callback(new Error(`[CORS] Origin ${origin} not allowed`));
                  }
              }
            : true,
        credentials: true,
    });
};
