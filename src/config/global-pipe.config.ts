import type { INestApplication } from '@nestjs/common';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { isProduction } from '../common/utils/env.util';

export const setupPipe = (app: INestApplication) => {
    //Pipe
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
            forbidNonWhitelisted: true,
            disableErrorMessages: isProduction(),
            exceptionFactory: (errors) => {
                return new BadRequestException(
                    isProduction()
                        ? 'Invalid request parameters'
                        : errors.map((err) => ({
                              property: err.property,
                              constraints: err.constraints,
                          })),
                );
            },
        }),
    );
};
