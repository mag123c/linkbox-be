import type { INestApplication } from '@nestjs/common';

export const setupCors = (app: INestApplication) => {
    //CORS, CREDENTIALS
    app.enableCors({
        // origin: (origin, callback) => {
        //     const allowedOrigins: string[] = [
        //         'http://localhost:5555',
        //         'https://campable.ee',
        //         'https://api.campable.ee',
        //         'https://alpha-api.campable.ee',
        //     ];
        //     if (!origin || allowedOrigins.includes(origin)) {
        //         callback(null, true);
        //     } else {
        //         callback(new Error(`[CORS] Origin ${origin} not allowed`));
        //     }
        // },
        origin: true,
        credentials: true,
    });
};
