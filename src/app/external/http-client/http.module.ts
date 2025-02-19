import { Module } from '@nestjs/common';
import { AxiosClient } from './axios.client';

@Module({
    providers: [
        {
            provide: 'HTTP_CLIENT',
            useFactory: () => {
                return new AxiosClient({
                    timeout: 5000,
                });
            },
        },
    ],
    exports: ['HTTP_CLIENT'],
})
export class HttpModule {}
