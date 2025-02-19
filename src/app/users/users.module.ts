import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { Users } from './entities/users.entity';
import { UsersRepository } from './repositories/users.repository';
import { UsersService } from './services/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    providers: [UsersService, UsersRepository],
    controllers: [UsersController],
})
export class UsersModule {}
