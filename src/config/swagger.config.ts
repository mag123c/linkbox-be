import type { INestApplication } from '@nestjs/common';
import type { SwaggerCustomOptions } from '@nestjs/swagger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { isProduction, isStaging } from '../common/utils/env.util';

const baseURI = process.env.BASED_API_URL!;

export const swaggerConfig = () => {
    const builder = new DocumentBuilder()
        .setTitle('Campable Equipments API')
        .setDescription('캠퍼블 장비관리 API')
        .setVersion('alpha')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                name: 'JWT',
                in: 'header',
            },
            'accessToken',
        );

    if (isProduction() || isStaging()) {
        builder.addServer(`${baseURI}`, `${process.env.NODE_ENV} SERVER`);
    }

    return builder.build();
};

export const setupSwagger = (app: INestApplication) => {
    const document = SwaggerModule.createDocument(app, swaggerConfig(), {});
    const swaggerOptions: SwaggerCustomOptions = {};

    SwaggerModule.setup('/docs', app, document, swaggerOptions);
};
