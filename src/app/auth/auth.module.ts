import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthStrategy } from './strategies/auth.strategy';
import { KakaoOAuthStrategy } from './strategies/kakao.strategy';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                signOptions: {
                    expiresIn: configService.get('JWT_EXPIRES_IN'),
                    algorithm: configService.get('JWT_ALGORITHM'),
                },
                secret: configService.get('JWT_SECRET'),
            }),
        }),
        UsersModule,
    ],
    providers: [AuthService, AuthStrategy, KakaoOAuthStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
